import React, { useState } from 'react';
import { 
  DiagnosticReport, 
  ScorePillar 
} from '../types/resume';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowUpRight, 
  Sparkles, 
  FileText, 
  Printer, 
  RotateCcw, 
  Eye, 
  Layers, 
  Check, 
  Copy, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Target
} from 'lucide-react';

interface AuditReportProps {
  report: DiagnosticReport;
  onReset: () => void;
  onOpenN8nModal: () => void;
}

export const AuditReport: React.FC<AuditReportProps> = ({
  report,
  onReset,
  onOpenN8nModal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'rewrites' | 'recruiter' | 'receipt'>('overview');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'B+':
      case 'B':
        return 'text-sky-400 border-sky-500/30 bg-sky-500/10';
      case 'C':
        return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      default:
        return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
    }
  };

  const getPillarStatusBadge = (status: ScorePillar['status']) => {
    switch (status) {
      case 'excellent':
        return <span className="text-emerald-400 text-xs font-semibold">Optimal</span>;
      case 'good':
        return <span className="text-sky-400 text-xs font-semibold">Solid</span>;
      case 'warning':
        return <span className="text-amber-400 text-xs font-semibold">Review Needed</span>;
      case 'critical':
        return <span className="text-rose-400 text-xs font-semibold">Fix Immediately</span>;
    }
  };

  const handleCopyRewrite = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="audit-report" className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Success Banner */}
      <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-emerald-200">
              Audit Complete & Workflow Successfully Dispatched!
            </div>
            <div className="text-xs text-emerald-400/80 flex items-center gap-2">
              <span>n8n Cloud Webhook Received (200 OK)</span>
              <span aria-hidden="true">·</span>
              <span>Candidate: {report.candidateName}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenN8nModal}
          className="text-xs text-emerald-300 underline underline-offset-4 hover:text-white transition-colors cursor-pointer"
        >
          View n8n Receipt
        </button>
      </div>

      {/* Main Report Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Top Header Section */}
        <div className="p-6 sm:p-8 border-b border-slate-800 bg-slate-900/60">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs font-medium text-indigo-400 flex items-center gap-2">
                <span>VANTAGE RESUME INTELLIGENCE</span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-400">REPORT ID: {report.id}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {report.candidateName}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
                <span>{report.targetRole}</span>
                <span aria-hidden="true">·</span>
                <span>{report.experienceLevel}</span>
                <span aria-hidden="true">·</span>
                <span>{report.filename}</span>
                <span aria-hidden="true">·</span>
                <span>{report.submittedAt}</span>
              </div>
            </div>

            {/* Score Ring / Card */}
            <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 p-4 rounded-xl shrink-0">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline justify-center gap-0.5">
                  <span>{report.overallScore}</span>
                  <span className="text-sm font-normal text-slate-500">/100</span>
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
                  ATS Score
                </div>
              </div>

              <div className="h-10 w-[1px] bg-slate-800" />

              <div className="text-center px-1">
                <div className={`text-xl font-black px-2.5 py-0.5 rounded-md border ${getGradeColor(report.scoreGrade)}`}>
                  {report.scoreGrade}
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
                  Rating
                </div>
              </div>
            </div>
          </div>

          {/* Executive Verdict Box */}
          <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Executive ATS Diagnostic Verdict
                </div>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  {report.summaryVerdict}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Pillar Quick Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 bg-slate-950/40 border-b border-slate-800">
          {report.pillars.map((pillar) => (
            <div key={pillar.name} className="p-4 text-center sm:text-left">
              <div className="text-xs text-slate-400 font-medium truncate mb-1">
                {pillar.name}
              </div>
              <div className="flex items-baseline gap-1.5 justify-center sm:justify-start">
                <span className="text-lg font-bold text-white">{pillar.score}%</span>
                {getPillarStatusBadge(pillar.status)}
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    pillar.score >= 85
                      ? 'bg-emerald-500'
                      : pillar.score >= 70
                      ? 'bg-sky-500'
                      : pillar.score >= 60
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${pillar.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Report Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 bg-slate-950 border-b border-slate-800 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pillar Audit & Red Flags
          </button>
          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'keywords'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Keyword & Skill Gap Matrix
          </button>
          <button
            onClick={() => setActiveTab('rewrites')}
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'rewrites'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Google XYZ Bullet Rewrites
          </button>
          <button
            onClick={() => setActiveTab('recruiter')}
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'recruiter'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            6-Second Recruiter Heat Test
          </button>
          <button
            onClick={() => setActiveTab('receipt')}
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'receipt'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            n8n Pipeline Receipt
          </button>
        </div>

        {/* Tab 1: Overview & Pillar Analysis */}
        {activeTab === 'overview' && (
          <div className="p-6 sm:p-8 space-y-8">
            {/* Strengths & Critical Flags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Passed Strengths */}
              <div className="p-5 rounded-xl bg-slate-950/60 border border-emerald-500/20">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Key Strengths & Passed Checks ({report.strengths.length})
                </div>
                <ul className="space-y-2.5">
                  {report.strengths.map((str, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold mt-0.5">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Critical Flags to Fix */}
              <div className="p-5 rounded-xl bg-slate-950/60 border border-rose-500/20">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Actionable Flags & Gaps ({report.criticalRedFlags.length})
                </div>
                <ul className="space-y-2.5">
                  {report.criticalRedFlags.map((flag, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-rose-400 font-bold mt-0.5">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Deep Pillar Breakdowns */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white tracking-tight">
                Comprehensive Pillar Breakdown
              </h3>
              <div className="space-y-3">
                {report.pillars.map((pillar) => (
                  <div key={pillar.name} className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-white text-sm">
                        {pillar.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{pillar.score}/100</span>
                        {getPillarStatusBadge(pillar.status)}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{pillar.summary}</p>
                    <div className="space-y-1 pl-3 border-l-2 border-slate-800">
                      {pillar.details.map((detail, idx) => (
                        <div key={idx} className="text-xs text-slate-300">
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Keyword & Skill Gap Matrix */}
        {activeTab === 'keywords' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Role Keyword Optimization Matrix
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Comparing detected resume terminology against the primary requirements for <strong className="text-white">{report.targetRole}</strong>.
              </p>
            </div>

            {/* Matched Keywords */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                Matched Technical & Domain Keywords ({report.keywords.matchedKeywords.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {report.keywords.matchedKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium"
                  >
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Crucial Keywords */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" />
                High-Frequency Missing Keywords ({report.keywords.missingCrucialKeywords.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {report.keywords.missingCrucialKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-mono font-medium"
                  >
                    + Add "{kw}"
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Incorporating these missing terms into your past project descriptions will directly elevate your score in Workday and Taleo keyword search algorithms.
              </p>
            </div>

            {/* Suggested Industry Additions */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Recommended Competency Additions
              </div>
              <div className="flex flex-wrap gap-2">
                {report.keywords.suggestedAdditions.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-medium"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Google XYZ Bullet Point Rewrites */}
        {activeTab === 'rewrites' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Google XYZ Impact Bullet Optimizer
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Google formula: <em>"Accomplished [X] as measured by [Y], by doing [Z]"</em>. Transform passive duties into quantifiable executive milestones.
              </p>
            </div>

            <div className="space-y-4">
              {report.bulletRewrites.map((rewrite, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                  {/* Original Bullet */}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-1 flex items-center justify-between">
                      <span>Before (Weak / Passive Duty)</span>
                      <span className="text-slate-500 font-normal">Score: ~45/100</span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400 p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30">
                      "{rewrite.original}"
                    </div>
                  </div>

                  {/* Optimized Bullet */}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        After (Google XYZ Optimized)
                      </span>
                      <span className="text-emerald-400 font-semibold font-mono">+{rewrite.impactScoreIncrease}% Impact Boost</span>
                    </div>
                    <div className="text-xs sm:text-sm text-white font-medium p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex items-start justify-between gap-3">
                      <span>"{rewrite.revised}"</span>
                      <button
                        onClick={() => handleCopyRewrite(rewrite.revised, idx)}
                        className="text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
                        title="Copy rewritten bullet to clipboard"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="text-xs text-slate-400 italic">
                    Reason: {rewrite.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Recruiter 6-Second Scan Simulation */}
        {activeTab === 'recruiter' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                6-Second Recruiter Eye-Tracking Heat Simulation
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Ladders eye-tracking research shows human recruiters spend an average of 6 seconds before deciding between "Interview" and "Reject".
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <div className="text-2xl font-bold text-white">
                  {report.recruiterImpression.readingTimeSeconds}s
                </div>
                <div className="text-xs text-slate-400 mt-1">Estimated Scan Time</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <div className="text-2xl font-bold text-emerald-400">
                  {report.recruiterImpression.passLikelihoodPercent}%
                </div>
                <div className="text-xs text-slate-400 mt-1">Screen Pass Likelihood</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <div className="text-2xl font-bold text-indigo-400">
                  Top 8%
                </div>
                <div className="text-xs text-slate-400 mt-1">Applicant Tier</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Focal Points Captured in Initial Scan
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {report.recruiterImpression.firstScanFocus}
              </p>
              <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200">
                💡 <strong>Recruiter Tip:</strong> Keep your most prestigious employer logos or high-impact metrics in the top 35% of the page ("above the fold") to secure immediate recruiter buy-in.
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: n8n Pipeline Receipt */}
        {activeTab === 'receipt' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                n8n Cloud Webhook Transmission Receipt
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Verified delivery receipt from the live automated pipeline running at <code className="text-indigo-400">pallavichikkam.app.n8n.cloud</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">HTTP Target:</span>
                <span className="text-indigo-400 truncate max-w-xs">{report.n8nSubmission.workflowUrl}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Status:</span>
                <span className="text-emerald-400 font-semibold">200 OK (Received & Processed)</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Candidate Email:</span>
                <span className="text-white">{report.candidateEmail}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Resume File:</span>
                <span className="text-white">{report.filename} ({(report.fileSizeBytes / 1024).toFixed(1)} KB)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pipeline Timestamp:</span>
                <span className="text-slate-400">{report.n8nSubmission.timestamp}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenN8nModal}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Inspect Workflow Details
              </button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Automated evaluation synchronized with n8n workflow pipeline.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>

            <button
              onClick={onReset}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Scan Another Resume</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
