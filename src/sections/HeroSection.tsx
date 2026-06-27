import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface HeroSectionProps {
    name: string;
    role: string;
    onContentReady?: () => void;
    pdfUrl?: string;
}

export const HeroSection = ({ name, role, onContentReady, pdfUrl }: HeroSectionProps) => {
    useEffect(() => {
        onContentReady?.();
    }, [onContentReady]);

    return (
        <div id="about" className="mb-10 flex flex-col md:flex-row gap-16 items-center md:items-start text-center md:text-left">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
                className="flex-1 w-full"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-none tracking-tight text-slate-800 uppercase font-display">
                    {name}
                </h1>

                <div className="text-xs md:text-sm font-semibold text-slate-700 mb-10 uppercase tracking-[0.3em] flex items-center justify-center md:justify-start font-mono">
                    {role}
                </div>

                {pdfUrl && (
                    <div className="flex justify-center md:justify-start">
                        <a
                            href={pdfUrl}
                            download="Ivan_Deineka_CV.pdf"
                            className="group flex items-center gap-2.5 px-5 py-2.5 bg-soft-surface/60 border border-slate-200/60 hover:border-dusty-blue/40 hover:bg-soft-surface/90 transition-all duration-300 uppercase text-[9px] tracking-widest rounded-xl text-slate-500 hover:text-slate-800 font-mono"
                        >
                            <FileText size={14} className="text-dusty-blue" />
                            <span className="font-bold">Boring CV (PDF)</span>
                        </a>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
