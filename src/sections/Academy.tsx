import { motion } from 'framer-motion';
import { GraduationCap, Globe } from 'lucide-react';
import { Section } from '../components/Section';

interface AcademyProps {
    education: {
        degree: string;
        institution: string;
        period: string;
        institutionUrl?: string;
    };
    languages: {
        name: string;
        level: string;
    }[];
}

export const Academy = ({ education, languages }: AcademyProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Education */}
            <Section title="Education" icon={GraduationCap} id="education">
                <motion.a
                    href={education.institutionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Visit ${education.institution}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
                    whileHover={{ y: -2 }}
                    className="card h-full block cursor-pointer group hover:border-dusty-blue/30 hover:bg-soft-surface/80 transition-all duration-300"
                >
                    <h3 className="text-lg font-bold text-slate-800 uppercase mb-3">{education.degree}</h3>
                    <div className="mb-4">
                        <p className="text-dusty-blue font-semibold tracking-wider uppercase transition-colors">{education.institution}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">{education.period}</span>
                </motion.a>
            </Section>

            {/* Languages */}
            <Section title="Languages" icon={Globe}>
                <div className="card h-full flex flex-wrap gap-8 justify-around items-center">
                    {languages.map((lang, lIdx) => (
                        <div key={lIdx} className="flex flex-col items-center">
                            <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider mb-1.5">{lang.name}</span>
                            <span className="text-[10px] font-semibold bg-soft-surface/45 text-sage-green border border-slate-200/60 px-3 py-1.5 uppercase tracking-widest rounded-lg font-mono">{lang.level}</span>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
};
