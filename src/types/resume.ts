export interface SubmissionPayload {
  name: string;
  email: string;
  targetRole: string;
  experienceLevel: string;
  jobDescription?: string;
  file: File;
}

export interface ScorePillar {
  name: string;
  score: number; // 0 - 100
  status: 'excellent' | 'good' | 'warning' | 'critical';
  summary: string;
  details: string[];
}

export interface BulletRewrite {
  original: string;
  revised: string;
  reason: string;
  impactScoreIncrease: number;
}

export interface KeywordAnalysis {
  matchedKeywords: string[];
  missingCrucialKeywords: string[];
  suggestedAdditions: string[];
}

export interface DiagnosticReport {
  id: string;
  candidateName: string;
  candidateEmail: string;
  targetRole: string;
  experienceLevel: string;
  filename: string;
  fileSizeBytes: number;
  submittedAt: string;
  overallScore: number;
  scoreGrade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'Needs Revision';
  summaryVerdict: string;
  pillars: ScorePillar[];
  strengths: string[];
  criticalRedFlags: string[];
  bulletRewrites: BulletRewrite[];
  keywords: KeywordAnalysis;
  recruiterImpression: {
    firstScanFocus: string;
    readingTimeSeconds: number;
    passLikelihoodPercent: number;
  };
  n8nSubmission: {
    status: 'dispatched' | 'confirmed';
    workflowUrl: string;
    timestamp: string;
  };
}

export interface SampleResumeItem {
  id: string;
  title: string;
  candidateName: string;
  email: string;
  role: string;
  experience: string;
  score: number;
  summary: string;
  fileName: string;
  content: string;
}
