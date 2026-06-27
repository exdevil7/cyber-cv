import { useState, useEffect } from 'react';
import { cvData } from './data/cvData';
import { HeroSection } from './sections/HeroSection';
import { ContactHub } from './sections/ContactHub';
import { SkillsGrid } from './sections/SkillsGrid';
import { MissionLog } from './sections/MissionLog';
import { Academy } from './sections/Academy';
import { Certifications } from './sections/Certifications';
import { Footer } from './layout/Footer';
import { SummarySection } from './sections/SummarySection';
import { Header } from './layout/Header';
import { LoadingBar } from './components/LoadingBar';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
          return savedTheme === 'dark';
      }
      return false; // Default to light mode
  });

  useEffect(() => {
      if (isDarkMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
      } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
      }
  }, [isDarkMode]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-bg text-slate-800 flex flex-col items-center justify-center p-6 selection:bg-sage-green/30 selection:text-white relative">
        <div className="lounge-bloom-1"></div>
        <div className="lounge-bloom-2"></div>
        <div className="lounge-bloom-3"></div>
        <div className="soft-grid"></div>
        
        <div className="w-full max-w-md relative z-10 animate-fade-in">
          <LoadingBar onComplete={() => setIsLoading(false)} />
        </div>
      </div>
    );
  }

  return (
    <div id="top" className="min-h-screen bg-soft-bg text-slate-800 selection:bg-sage-green/30 selection:text-white relative animate-fade-in">
      {/* Ambient Lounge Glows & Flat Technical Grid */}
      <div className="lounge-bloom-1"></div>
      <div className="lounge-bloom-2"></div>
      <div className="lounge-bloom-3"></div>
      <div className="soft-grid"></div>

      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative z-10">
        <HeroSection
          name={cvData.name}
          role={cvData.role}
          pdfUrl={cvData.pdfUrl}
        />

        <div className="animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-16 items-stretch mb-16">
              <SummarySection summary={cvData.summary} hudData={cvData.hudData} intel={cvData.intel} />
              <ContactHub data={cvData} />
            </div>

            <SkillsGrid skills={cvData.skills} />
            <MissionLog experience={cvData.experience} />
            <Academy education={cvData.education} languages={cvData.languages} />
            <Certifications certifications={cvData.certifications} />
        </div>
      </main>

      <Footer name={cvData.name} version={cvData.version} />
    </div>
  );
}

export default App;
