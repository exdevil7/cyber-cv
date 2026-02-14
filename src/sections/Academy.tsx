import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
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
            <Section title="Academy" icon={GraduationCap} id="education">
                <motion.a
                    href={education.institutionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Visit ${education.institution}`}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="card h-full block cursor-pointer group hover:border-retro-cyan/50 hover:bg-retro-cyan/5 transition-all duration-300"
                >
                    <h3 className="text-xl font-black text-retro-pink font-orbitron uppercase italic mb-4">{education.degree}</h3>
                    <div className="mb-4">
                        <p className="text-retro-cyan font-bold tracking-widest uppercase group-hover:text-white transition-colors">{education.institution}</p>
                    </div>
                    <span className="text-xs font-black font-orbitron text-slate-500 uppercase tracking-widest">{education.period}</span>
                </motion.a>
            </Section>

            {/* Languages */}
            <Section title="Comms" icon={MapPin}>
                <div className="card h-full flex flex-wrap gap-8 justify-around items-center">
                    {languages.map((lang, lIdx) => (
                        <div key={lIdx} className="flex flex-col items-center">
                            <span className="text-sm font-black font-orbitron text-retro-cyan uppercase tracking-widest mb-1">{lang.name}</span>
                            <span className="text-[10px] font-bold bg-retro-pink/20 text-retro-pink px-2 py-1 uppercase">{lang.level}</span>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
};
