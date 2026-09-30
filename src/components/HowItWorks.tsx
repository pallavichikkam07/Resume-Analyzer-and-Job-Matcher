import React from 'react';
import { UploadCloud, Cpu, CheckSquare, Zap, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onScrollToForm: () => void;
  onOpenN8nModal: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onScrollToForm,
  onOpenN8nModal,
}) => {
  const steps = [
    {
      step: '01',
      title: 'Encrypted Ingestion',
      description: 'Your PDF or DOCX file is parsed using UTF-8 structural boundary extractors to simulate how modern ATS robotic parsers ingest text nodes without breaking.',
      icon: UploadCloud,
      tag: 'Multi-Format Parser',
    },
    {
      step: '02',
      title: 'n8n Cloud Automation',
      description: 'The payload is safely transmitted to Pallavi Chikkam’s dedicated n8n workflow pipeline (1c203f12-34d0-402f-bf07-8c147ab042e8) for persistent logging and candidate evaluation.',
      icon: Zap,
      tag: 'Cloud Orchestration',
    },
    {
      step: '03',
      title: 'ATS Algorithm Simulation',
      description: 'Evaluated against the exact parsing rules, stopword filters, and keyword ranking formulas utilized by Workday, Greenhouse, Taleo, and Lever.',
      icon: Cpu,
      tag: '5-Pillar Scoring',
    },
    {
      step: '04',
      title: 'Google XYZ Action Plan',
      description: 'Receive instantaneous diagnostic scores, missing high-demand technical keywords, and line-by-line bullet rewrites to maximize callback velocity.',
      icon: CheckSquare,
      tag: 'Actionable Rewrites',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            The Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How the Automated Pipeline Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            From file drop to ATS score and automated cloud record creation in under 3 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-slate-700 group-hover:text-indigo-400/80 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-indigo-400 mb-1">
                    {item.tag}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-[11px] text-slate-500">
                  <span>Step {index + 1} of 4</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span>Automated</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenN8nModal}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <span>Learn more about Pallavi’s n8n workflow configuration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
