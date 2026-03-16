import { motion } from 'framer-motion';
import { Briefcase, Award } from 'lucide-react';
import { Section } from '../components/Section';

interface Experience {
    role: string;
    company: string;
    period: string;
    responsibilities: string[];
    achievements: { lvl1: string; lvl2?: string[] }[];
    companyUrl?: string;
    domain?: string;
}

interface MissionLogProps {
    experience: Experience[];
}

const highlightText = (text: string) => {
    if (!text) return text;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <span key={index} className="text-retro-cyan font-bold">
                    {part.slice(2, -2)}
                </span>
            );
        }
        return part;
    });
};

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
                                <div className="flex items-center gap-3">
                                    <div className="text-lg font-bold text-retro-cyan tracking-widest uppercase group-hover:text-white transition-colors">
                                        {exp.company}
                                    </div>
                                    {exp.domain && (
                                        <div className="text-xs font-bold text-slate-400 border border-slate-600 px-2 py-1 rounded bg-slate-800/50">
                                            {exp.domain}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <span className="text-[10px] font-black font-orbitron bg-retro-purple text-white px-4 py-2 uppercase tracking-[0.3em] skew-x-[-12deg]">
                                {exp.period}
                            </span>
                        </div>

                        <ul className="space-y-4 mb-8 relative z-10">
                            {exp.responsibilities.map((resp, rIdx) => (
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
                            <ul className="space-y-4">
                                {exp.achievements.map((ach, aIdx) => (
                                    <li key={aIdx} className="text-sm text-slate-400 italic">
                                        <div className="mb-2">{">> "}{highlightText(ach.lvl1)}</div>
                                        {ach.lvl2 && ach.lvl2.length > 0 && (
                                            <ul className="pl-6 space-y-2">
                                                {ach.lvl2.map((subAch, saIdx) => (
                                                    <li key={saIdx} className="text-sm text-slate-400 italic flex">
                                                        <span className="mr-2">-</span>
                                                        <span>{highlightText(subAch)}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};
