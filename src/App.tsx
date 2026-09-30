import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResumeForm } from './components/ResumeForm';
import { AuditReport } from './components/AuditReport';
import { HowItWorks } from './components/HowItWorks';
import { AtsChecklist } from './components/AtsChecklist';
import { SampleAudits } from './components/SampleAudits';
import { N8nTransparencyModal } from './components/N8nTransparencyModal';
import { Footer } from './components/Footer';
import { DiagnosticReport } from './types/resume';
import { SAMPLE_RESUMES } from './data/sampleResumes';
import { generateAuditReport } from './utils/analyzer';

const N8N_TARGET_URL = 'https://pallavichikkam.app.n8n.cloud/form/1c203f12-34d0-402f-bf07-8c147ab042e8';

export default function App() {
  const [activeReport, setActiveReport] = useState<DiagnosticReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSampleId, setSelectedSampleId] = useState<string | undefined>(undefined);
  const [isN8nModalOpen, setIsN8nModalOpen] = useState(false);
  const [isN8nConnected, setIsN8nConnected] = useState(true);

  // Check n8n workflow health on load
  useEffect(() => {
    fetch('/api/workflow-info')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.online !== undefined) {
          setIsN8nConnected(data.online);
        }
      })
      .catch((err) => {
        console.warn('Could not verify server proxy health:', err);
      });
  }, []);

  const handleScrollToForm = () => {
    const el = document.getElementById('analyzer-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Immediate test with sample resume
  const handleTrySample = (sampleId: string = 'fullstack-senior') => {
    const sample = SAMPLE_RESUMES.find((s) => s.id === sampleId) || SAMPLE_RESUMES[0];
    setSelectedSampleId(sample.id);

    // Build virtual file & generate instant audit
    const blob = new Blob([sample.content], { type: 'text/plain' });
    const virtualFile = new File([blob], sample.fileName, { type: 'text/plain' });

    const sampleReport = generateAuditReport(
      sample.candidateName,
      sample.email,
      sample.role,
      sample.experience,
      virtualFile,
      sample.content
    );

    setActiveReport(sampleReport);

    // Scroll to report smoothly
    setTimeout(() => {
      const el = document.getElementById('audit-report');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAuditComplete = (report: DiagnosticReport) => {
    setActiveReport(report);
    setTimeout(() => {
      const el = document.getElementById('audit-report');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleResetAudit = () => {
    setActiveReport(null);
    handleScrollToForm();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenN8nModal={() => setIsN8nModalOpen(true)}
        onScrollToForm={handleScrollToForm}
        onScrollToSection={handleScrollToSection}
        isN8nConnected={isN8nConnected}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToForm={handleScrollToForm}
          onTrySample={() => handleTrySample('fullstack-senior')}
          onOpenN8nModal={() => setIsN8nModalOpen(true)}
        />

        {/* Dynamic Audit Report Display if active */}
        {activeReport ? (
          <AuditReport
            report={activeReport}
            onReset={handleResetAudit}
            onOpenN8nModal={() => setIsN8nModalOpen(true)}
          />
        ) : null}

        {/* Analyzer Submission Studio */}
        <ResumeForm
          onAuditComplete={handleAuditComplete}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          selectedSampleId={selectedSampleId}
          onClearSample={() => setSelectedSampleId(undefined)}
        />

        {/* Pipeline Architecture / How It Works */}
        <HowItWorks
          onScrollToForm={handleScrollToForm}
          onOpenN8nModal={() => setIsN8nModalOpen(true)}
        />

        {/* ATS Standards & Comparison Pitfalls */}
        <AtsChecklist />

        {/* Curated Sample Audits Benchmark Library */}
        <SampleAudits
          onSelectSample={(sampleId) => handleTrySample(sampleId)}
          onScrollToForm={handleScrollToForm}
        />
      </main>

      {/* n8n Transparency Drawer / Modal */}
      <N8nTransparencyModal
        isOpen={isN8nModalOpen}
        onClose={() => setIsN8nModalOpen(false)}
        webhookUrl={N8N_TARGET_URL}
      />

      {/* Footer */}
      <Footer
        onOpenN8nModal={() => setIsN8nModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />
    </div>
  );
}
