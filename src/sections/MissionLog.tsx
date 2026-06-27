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
                <span key={index} className="text-dusty-blue font-bold">
                    {part.slice(2, -2)}
                </span>
            );
        }
        return part;
    });
};

export const MissionLog = ({ experience }: MissionLogProps) => {
    return (
        <Section title="Experience" icon={Briefcase} id="experience">
            <div className="space-y-12">
                {experience.map((exp, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
                        whileHover={exp.companyUrl ? { y: -2 } : {}}
                        className={`card relative group transition-all duration-300 ${exp.companyUrl ? "hover:border-dusty-blue/30 hover:bg-soft-surface/80 cursor-pointer" : ""}`}
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
                                <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-1 uppercase">
                                    {exp.role}
                                </h3>
                                <div className="flex items-center gap-3">
                                    <div className="text-base font-semibold text-dusty-blue tracking-wider uppercase transition-colors">
                                        {exp.company}
                                    </div>
                                    {exp.domain && (
                                        <div className="text-[10px] font-semibold text-slate-500 border border-slate-200/60 px-2 py-0.5 rounded-lg bg-soft-surface/40">
                                            {exp.domain}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <span className="text-[9px] font-bold bg-soft-surface/45 text-slate-700 border border-slate-200/60 px-2.5 py-1 uppercase tracking-wider rounded-lg font-mono">
                                {exp.period}
                            </span>
                        </div>

                        <ul className="space-y-4 mb-8 relative z-10">
                            {exp.responsibilities.map((resp, rIdx) => (
                                <li key={rIdx} className="flex gap-4 text-slate-700 font-medium leading-relaxed">
                                    <div className="mt-2 w-1.5 h-1.5 bg-dusty-blue shrink-0 rounded-full"></div>
                                    <span>{resp}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 pt-6 border-t border-slate-200/60 relative z-10">
                            <h4 className="text-[10px] font-bold text-slate-700 mb-4 flex items-center gap-2 uppercase tracking-widest font-mono">
                                <Award size={14} />
                                Key Achievements
                            </h4>
                            <ul className="space-y-4">
                                {exp.achievements.map((ach, aIdx) => (
                                    <li key={aIdx} className="text-sm text-slate-600 leading-relaxed">
                                        <div className="font-medium text-slate-800">{highlightText(ach.lvl1)}</div>
                                        {ach.lvl2 && ach.lvl2.length > 0 && (
                                            <ul className="pl-5 space-y-2 mt-2 list-disc marker:text-sage-green/40">
                                                {ach.lvl2.map((subAch, saIdx) => (
                                                    <li key={saIdx} className="text-[13px] text-slate-500">
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
