import React from 'react';
import { Sparkles, Shield, Terminal, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenN8nModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenN8nModal,
  onScrollToSection,
}) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">Vantage Resume Analyzer</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Enterprise-grade resume diagnostic and ATS evaluation platform connected to Pallavi Chikkam's automated n8n cloud pipeline.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
              <span>Workday · Greenhouse · Taleo Compliant</span>
              <span aria-hidden="true">·</span>
              <span>100% Encrypted</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection('analyzer-studio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Diagnostic Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pipeline Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('ats-standards')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ATS Filtering Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('sample-audits')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Benchmark Profiles
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Integrations & Direct URL */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Integration
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenN8nModal}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>n8n Cloud Webhook</span>
                  <Terminal className="w-3 h-3 text-slate-500" />
                </button>
              </li>
              <li>
                <a
                  href="https://pallavichikkam.app.n8n.cloud/form/1c203f12-34d0-402f-bf07-8c147ab042e8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Direct n8n Form</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <span className="text-slate-500">Form ID: 1c203f12-34d0</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Vantage Resume Analyzer. Connected to Pallavi Chikkam's n8n cloud automation.
          </div>
          <div className="flex items-center gap-4">
            <span>Client Privacy Assured</span>
            <span aria-hidden="true">·</span>
            <span>Zero Persistent Document Retention</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
