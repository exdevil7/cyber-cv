
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
        <Section title="Certifications" icon={Award}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {certifications.map((cert, cIdx) => (
                    <a
                        key={cIdx}
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card p-5 flex flex-col gap-4 text-center group hover:border-dusty-blue/30 hover:bg-soft-surface/80 transition-all duration-300"
                    >
                        <div className="relative mx-auto">
                            <Award size={24} className="text-sage-green group-hover:text-dusty-blue transition-colors" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest leading-relaxed text-slate-500 group-hover:text-slate-800 transition-colors font-mono">{cert.name}</span>
                        <div className="mt-auto pt-3 border-t border-slate-200/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 font-mono">
                            <span className="text-[8px] font-bold text-dusty-blue uppercase tracking-widest">Verify Credential</span>
                            <ExternalLink size={9} className="text-dusty-blue" />
                        </div>
                    </a>
                ))}
            </div>
        </Section>
    );
};
