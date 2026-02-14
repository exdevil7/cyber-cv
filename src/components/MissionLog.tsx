import { motion } from 'framer-motion';
import { Briefcase, Award } from 'lucide-react';
import { Section } from './Section';

interface Experience {
    role: string;
    company: string;
    period: string;
    responsibilities: string[];
    achievements: string[];
    companyUrl?: string;
}

interface MissionLogProps {
    experience: Experience[];
}

export const MissionLog = ({ experience }: MissionLogProps) => {
    return (
        <Section title="Mission Log" icon={Briefcase} id="experience">
            <div className="space-y-12">
                {experience.map((exp, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={exp.companyUrl ? { y: -5 } : {}}
                        className={`card relative group transition-all duration-300 ${exp.companyUrl ? "hover:border-retro-cyan/40 hover:bg-retro-cyan/5 shadow-[0_0_20px_rgba(0,255,255,0.05)] cursor-pointer" : ""}`}
                    >
                        {exp.companyUrl && (
                            <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 z-30"
                                title={`Visit ${exp.company}`}
                            />
                        )}
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-6 relative z-10">
                            <div>
                                <h3 className="text-2xl font-black text-retro-pink font-orbitron tracking-tight mb-2 uppercase italic">
                                    {exp.role}
                                </h3>
                                <div className="text-lg font-bold text-retro-cyan tracking-widest uppercase group-hover:text-white transition-colors">{exp.company}</div>
                            </div>
                            <span className="text-[10px] font-black font-orbitron bg-retro-purple text-white px-4 py-2 uppercase tracking-[0.3em] skew-x-[-12deg]">
                                {exp.period}
                            </span>
                        </div>

                        <ul className="space-y-4 mb-8 relative z-10">
                            {exp.responsibilities.slice(0, 4).map((resp, rIdx) => (
                                <li key={rIdx} className="flex gap-4 text-slate-300 font-medium leading-relaxed">
                                    <div className="mt-2 w-2 h-2 bg-retro-cyan shadow-[0_0_5px_#00ffff] shrink-0"></div>
                                    <span>{resp}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="bg-retro-purple/5 p-6 border-t-2 border-retro-purple/30 relative z-10">
                            <h4 className="text-xs font-black font-orbitron text-retro-pink mb-4 flex items-center gap-2 uppercase tracking-widest">
                                <Award size={16} />
                                ACHIEVEMENTS_UNLOCKED
                            </h4>
                            <ul className="space-y-3">
                                {exp.achievements.map((ach, aIdx) => (
                                    <li key={aIdx} className="text-sm text-slate-400 italic">{">> "}{ach}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};
