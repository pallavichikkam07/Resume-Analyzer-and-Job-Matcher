import React from 'react';
import { ArrowDown, CheckCircle2, ShieldCheck, Zap, Sparkles, Terminal, FileText } from 'lucide-react';

interface HeroProps {
  onScrollToForm: () => void;
  onTrySample: () => void;
  onOpenN8nModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToForm,
  onTrySample,
  onOpenN8nModal,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-800/80 bg-radial-[at_50%_0%] from-indigo-950/40 via-slate-950 to-slate-950">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Top metadata status line - Anti-slop clean typography without pill boxes */}
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-indigo-400 mb-6 tracking-wide">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live ATS Parser Engine
            </span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-400">n8n Cloud Automation Active</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-400">Workday & Greenhouse Compliant</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Beat the 6-Second Screen. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200 bg-clip-text text-transparent">
              Land 3x More Interviews.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stop losing opportunities to robotic ATS filters. Analyze your resume against 40+ recruiting algorithms, unlock Google XYZ impact rewrites, and dispatch directly into Pallavi’s automated workflow.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onScrollToForm}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Zap className="w-4 h-4 text-indigo-200" />
              <span>Analyze My Resume Now</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={onTrySample}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all hover:border-slate-600 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Load Benchmark Sample</span>
            </button>

            <button
              onClick={onOpenN8nModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl text-slate-400 hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-slate-500" />
              <span>View n8n Pipeline Spec</span>
            </button>
          </div>

          {/* Trust stats & verification badges */}
          <div className="mt-12 pt-8 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-2">
              <div className="text-2xl font-bold text-white tracking-tight">99.2%</div>
              <div className="text-xs text-slate-400 mt-0.5">Parse Accuracy</div>
            </div>
            <div className="p-2">
              <div className="text-2xl font-bold text-white tracking-tight">&lt; 2.4s</div>
              <div className="text-xs text-slate-400 mt-0.5">Evaluation Speed</div>
            </div>
            <div className="p-2">
              <div className="text-2xl font-bold text-white tracking-tight">5 Pillars</div>
              <div className="text-xs text-slate-400 mt-0.5">Diagnostic Depth</div>
            </div>
            <div className="p-2">
              <div className="text-2xl font-bold text-white tracking-tight">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">n8n Connected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
