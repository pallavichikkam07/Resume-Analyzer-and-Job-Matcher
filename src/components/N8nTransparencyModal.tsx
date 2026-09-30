import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, Terminal, Shield, Zap } from 'lucide-react';

interface N8nTransparencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl: string;
}

export const N8nTransparencyModal: React.FC<N8nTransparencyModalProps> = ({
  isOpen,
  onClose,
  webhookUrl,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              n8n Cloud Workflow Architecture
            </h3>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span>Host: pallavichikkam.app.n8n.cloud</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium">Webhook Online</span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
          This portal connects seamlessly to Pallavi Chikkam’s live n8n cloud automation. Every resume submitted via this frontend is safely forwarded directly to the webhook endpoint, triggering real-time document extraction and record processing.
        </p>

        {/* Endpoint details */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Production Webhook / Form Endpoint
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <code className="text-xs font-mono text-indigo-300 break-all flex-1">
                {webhookUrl}
              </code>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copy URL"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Form Fields schema */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Form Payload Schema (multipart/form-data)
            </label>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-indigo-400">field-0</span>
                <span className="text-slate-400">Candidate Full Name (Text, Required)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-indigo-400">field-1</span>
                <span className="text-slate-400">Email Address (Email, Required)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-indigo-400">field-2</span>
                <span className="text-slate-400">Upload_Resume (Binary PDF/DOCX, Required)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Automated Form ID: 1c203f12-34d0-402f-bf07-8c147ab042e8
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={webhookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              <span>Open Direct n8n Form</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
