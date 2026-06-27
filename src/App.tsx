import { motion } from 'framer-motion';
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

function App() {
  return (
    <div id="top" className="min-h-screen bg-soft-bg text-slate-800 selection:bg-sage-green/30 selection:text-white relative">
      {/* Ambient Lounge Glows & Flat Technical Grid */}
      <div className="lounge-bloom-1"></div>
      <div className="lounge-bloom-2"></div>
      <div className="lounge-bloom-3"></div>
      <div className="soft-grid"></div>

      <Header />

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
