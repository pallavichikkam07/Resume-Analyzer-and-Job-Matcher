import React from 'react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { ArrowUpRight, Sparkles, CheckCircle, FileText, User } from 'lucide-react';

interface SampleAuditsProps {
  onSelectSample: (sampleId: string) => void;
  onScrollToForm: () => void;
}

export const SampleAudits: React.FC<SampleAuditsProps> = ({
  onSelectSample,
  onScrollToForm,
}) => {
  const handlePick = (sampleId: string) => {
    onSelectSample(sampleId);
    onScrollToForm();
  };

  return (
    <section id="sample-audits" className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            Benchmark Library
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Curated Candidate Benchmarks
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Explore audited resumes across software engineering, product leadership, and growth marketing to see high-scoring structures in action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_RESUMES.map((sample) => (
            <div
              key={sample.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {sample.score}
                      <span className="text-xs font-normal text-slate-500">/100</span>
                    </div>
                    <div className="text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">
                      Tier A Candidate
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {sample.title}
                </h3>
                <div className="text-xs text-slate-400 mt-1 mb-3">
                  {sample.candidateName} · {sample.experience}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {sample.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono truncate max-w-[150px]">
                  {sample.fileName}
                </span>
                <button
                  onClick={() => handlePick(sample.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <span>Test This Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
