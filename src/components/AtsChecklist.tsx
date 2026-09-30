import React from 'react';
import { Check, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AtsChecklist: React.FC = () => {
  const pitfalls = [
    {
      bad: 'Multi-column tables and text boxes that scramble parsing sequences',
      good: 'Single-column hierarchical flow with standard linear DOM text stream',
    },
    {
      bad: 'Creative non-standard section headers ("My Odyssey", "Toolbox")',
      good: 'Universal ATS standard headings ("Experience", "Skills", "Education")',
    },
    {
      bad: 'Vague task lists ("Responsible for maintaining internal databases")',
      good: 'Google XYZ quantifiable metrics ("Decreased query latency by 42% via Redis")',
    },
    {
      bad: 'Icons, graphics, or logos embedding important contact links',
      good: 'Live, selectable text hyperlinks for LinkedIn, GitHub, and email',
    },
    {
      bad: 'Saving as non-standard image formats or flattened scans',
      good: 'Text-selectable PDF or DOCX encoded with standard Unicode UTF-8',
    },
  ];

  return (
    <section id="ats-standards" className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            The ATS Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why 75% of Resumes Never Reach a Human
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Applicant Tracking Systems don't read resumes like humans. Here is how Vantage bridges the gap between robotic parsers and executive recruiters.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {/* Left: What Rejects */}
            <div className="p-6 sm:p-8 bg-rose-950/10">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wider mb-6">
                <ShieldAlert className="w-4 h-4" />
                <span>What Fails ATS Filters (75% Rejection Rate)</span>
              </div>
              <div className="space-y-4">
                {pitfalls.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300">
                      {item.bad}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: What Vantage Enforces */}
            <div className="p-6 sm:p-8 bg-emerald-950/10">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider mb-6">
                <CheckCircle2 className="w-4 h-4" />
                <span>What Passes Vantage Diagnostic (Top 5% Tier)</span>
              </div>
              <div className="space-y-4">
                {pitfalls.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-white font-medium">
                      {item.good}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
