import { useState } from 'react';
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
  const [showContent, setShowContent] = useState(false);

  return (
    <div id="top" className="min-h-screen bg-retro-black text-slate-200 selection:bg-retro-pink selection:text-white">
      {/* Retrowave Background Effects */}
      <div className="scanlines"></div>
      <div className="retro-grid"></div>
      <div className="retro-sun"></div>

      <Header />

      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative z-10">
        <HeroSection
          name={cvData.name}
          role={cvData.role}
          pdfUrl={cvData.pdfUrl}
          onContentReady={() => setShowContent(true)}
        />

        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col lg:flex-row gap-16 items-stretch mb-32">
              <SummarySection summary={cvData.summary} hudData={cvData.hudData} intel={cvData.intel} />
              <ContactHub data={cvData} />
            </div>

            <SkillsGrid skills={cvData.skills} />
            <MissionLog experience={cvData.experience} />
            <Academy education={cvData.education} languages={cvData.languages} />
            <Certifications certifications={cvData.certifications} />
          </motion.div>
        )}
      </main>

      {showContent && <Footer name={cvData.name} version={cvData.version} />}
    </div>
  );
}

export default App;
