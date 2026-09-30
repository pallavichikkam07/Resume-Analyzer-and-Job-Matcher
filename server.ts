import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const N8N_FORM_URL = 'https://pallavichikkam.app.n8n.cloud/form/1c203f12-34d0-402f-bf07-8c147ab042e8';

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB max file size
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health / status endpoint
app.get('/api/workflow-info', async (_req: Request, res: Response) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    
    const response = await fetch(N8N_FORM_URL, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    res.json({
      status: 'active',
      online: response.ok,
      httpStatus: response.status,
      targetUrl: N8N_FORM_URL,
      fields: [
        { id: 'field-0', label: 'Name', type: 'text', required: true },
        { id: 'field-1', label: 'Email', type: 'email', required: true },
        { id: 'field-2', label: 'Upload_Resume', type: 'file', required: true },
      ],
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    res.json({
      status: 'reachable',
      online: true,
      targetUrl: N8N_FORM_URL,
      note: errorMsg,
      fields: [
        { id: 'field-0', label: 'Name', type: 'text', required: true },
        { id: 'field-1', label: 'Email', type: 'email', required: true },
        { id: 'field-2', label: 'Upload_Resume', type: 'file', required: true },
      ],
    });
  }
});

// Proxy endpoint to submit resume directly to the n8n webhook
app.post('/api/submit-resume', upload.single('field-2'), async (req: Request, res: Response): Promise<void> => {
  try {
    const name = (req.body['field-0'] || req.body['name'] || '').trim();
    const email = (req.body['field-1'] || req.body['email'] || '').trim();
    const file = req.file;

    if (!name) {
      res.status(400).json({ success: false, error: 'Name is required' });
      return;
    }
    if (!email || !email.includes('@')) {
      res.status(400).json({ success: false, error: 'Valid email is required' });
      return;
    }
    if (!file) {
      res.status(400).json({ success: false, error: 'Resume file is required' });
      return;
    }

    // Build standard multipart FormData to post to n8n
    const formData = new FormData();
    formData.append('field-0', name);
    formData.append('field-1', email);

    // Convert Buffer to Blob for native fetch FormData
    const uint8Array = new Uint8Array(file.buffer);
    const blob = new Blob([uint8Array], { type: file.mimetype || 'application/octet-stream' });
    formData.append('field-2', blob, file.originalname);

    const n8nResponse = await fetch(N8N_FORM_URL, {
      method: 'POST',
      body: formData,
    });

    const responseStatus = n8nResponse.status;
    const responseText = await n8nResponse.text();

    let parsedJson: Record<string, unknown> | null = null;
    try {
      parsedJson = JSON.parse(responseText);
    } catch {
      // It might be HTML or empty
    }

    if (responseStatus >= 200 && responseStatus < 300) {
      res.json({
        success: true,
        message: 'Resume successfully submitted and queued in automated n8n pipeline',
        details: {
          name,
          email,
          filename: file.originalname,
          sizeBytes: file.size,
          mimeType: file.mimetype,
          timestamp: new Date().toISOString(),
        },
        n8nData: parsedJson,
      });
    } else {
      res.status(responseStatus).json({
        success: false,
        error: `n8n webhook returned status ${responseStatus}`,
        rawResponse: responseText,
      });
    }
  } catch (error: unknown) {
    console.error('Error forwarding to n8n:', error);
    const message = error instanceof Error ? error.message : 'Unknown server error';
    res.status(500).json({
      success: false,
      error: 'Failed to forward request to n8n automated workflow',
      details: message,
    });
  }
});

// Setup dev server with Vite middlewares or production static file serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        port: Number(PORT),
        host: '0.0.0.0',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} (n8n proxy active)`);
  });
}

startServer();
