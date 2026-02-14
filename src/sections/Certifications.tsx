import { motion } from 'framer-motion';
import { Award, Link as ExternalLink } from 'lucide-react';
import { Section } from '../components/Section';

interface Certification {
    name: string;
    url: string;
}

interface CertificationsProps {
    certifications: Certification[];
}

export const Certifications = ({ certifications }: CertificationsProps) => {
    return (
        <Section title="Encrypted Mods" icon={Award}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {certifications.map((cert, cIdx) => (
                    <motion.a
                        key={cIdx}
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="card p-5 border-retro-cyan/20 flex flex-col gap-4 text-center group hover:border-retro-cyan hover:bg-retro-cyan/5 transition-all duration-300"
                    >
                        <div className="relative mx-auto">
                            <Award size={32} className="text-retro-pink group-hover:text-retro-cyan transition-colors" />
                            <div className="absolute -inset-1 bg-retro-cyan/20 blur opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                        </div>
                        <span className="text-[10px] font-black font-orbitron uppercase tracking-widest leading-relaxed group-hover:text-white transition-colors">{cert.name}</span>
                        <div className="mt-auto pt-2 border-t border-retro-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <span className="text-[8px] font-bold text-retro-cyan uppercase">Verify_Credential</span>
                            <ExternalLink size={10} className="text-retro-cyan" />
                        </div>
                    </motion.a>
                ))}
            </div>
        </Section>
    );
};
