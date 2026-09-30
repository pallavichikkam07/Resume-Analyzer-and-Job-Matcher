import React from 'react';
import { Sparkles, Activity, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenN8nModal: () => void;
  onScrollToForm: () => void;
  onScrollToSection: (sectionId: string) => void;
  isN8nConnected?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenN8nModal,
  onScrollToForm,
  onScrollToSection,
  isN8nConnected = true,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">Vantage</span>
              <span className="text-slate-400 text-sm font-medium">Resume Analyzer</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span>n8n Cloud Automated</span>
              <span aria-hidden="true">·</span>
              <span>Enterprise ATS Engine</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <button
            onClick={() => onScrollToSection('analyzer-studio')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Analyzer Studio
          </button>
          <button
            onClick={() => onScrollToSection('how-it-works')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Workflow Architecture
          </button>
          <button
            onClick={() => onScrollToSection('ats-standards')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            ATS Benchmarks
          </button>
          <button
            onClick={() => onScrollToSection('sample-audits')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Sample Audits
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* n8n Status Pill */}
          <button
            onClick={onOpenN8nModal}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:border-slate-700 hover:text-white transition-all cursor-pointer"
            title="Click to view n8n workflow integration details"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isN8nConnected ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isN8nConnected ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
            </span>
            <span className="font-mono text-[11px]">n8n Cloud: Connected</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </button>

          {/* Primary CTA */}
          <button
            onClick={onScrollToForm}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Scan Resume</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
