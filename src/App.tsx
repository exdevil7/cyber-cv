import { useState } from 'react';
import { motion } from 'framer-motion';
import { cvData } from './data/cvData';
import { HeroSection } from './components/HeroSection';
import { ContactHub } from './components/ContactHub';
import { SkillsGrid } from './components/SkillsGrid';
import { MissionLog } from './components/MissionLog';
import { Academy } from './components/Academy';
import { Certifications } from './components/Certifications';
import { Footer } from './components/Footer';
import { SummarySection } from './components/SummarySection';

function App() {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="min-h-screen bg-retro-black text-slate-200 selection:bg-retro-pink selection:text-white">
      {/* Retrowave Background Effects */}
      <div className="scanlines"></div>
      <div className="retro-grid"></div>
      <div className="retro-sun"></div>

      <header className="fixed top-0 left-0 right-0 z-[60] bg-retro-black/80 backdrop-blur-xl border-b border-retro-purple/30">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black font-orbitron tracking-tighter italic gradient-text px-2"
          >
            MY CV
          </motion.div>
          <nav className="hidden md:flex items-center gap-10 text-xs font-black uppercase tracking-widest font-orbitron">
            <a href="#about" className="text-slate-100 hover:text-retro-pink hover:neon-text-pink transition-all">About</a>
            <a href="#skills" className="text-slate-100 hover:text-retro-pink hover:neon-text-pink transition-all">Skills</a>
            <a href="#experience" className="text-slate-100 hover:text-retro-pink hover:neon-text-pink transition-all">Experience</a>
            <a href="#education" className="text-slate-100 hover:text-retro-pink hover:neon-text-pink transition-all">Education</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative z-10">
        <HeroSection
          name={cvData.name}
          role={cvData.role}
          onContentReady={() => setShowContent(true)}
        />

        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col lg:flex-row gap-16 items-stretch mb-32">
              <SummarySection summary={cvData.summary} />
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
