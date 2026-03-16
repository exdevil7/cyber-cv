import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TypingEffect } from '../components/TypingEffect';
import { LoadingBar } from '../components/LoadingBar';
import { ScrambleEffect } from '../components/ScrambleEffect';
import { FileText } from 'lucide-react';

interface HeroSectionProps {
    name: string;
    role: string;
    onContentReady?: () => void;
    pdfUrl?: string;
}

export const HeroSection = ({ name, role, onContentReady, pdfUrl }: HeroSectionProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const handleLoadingComplete = useCallback(() => {
        setIsLoading(false);
        setShowContent(true);
        onContentReady?.();
    }, [onContentReady]);

    return (
        <div id="about" className="mb-4 flex flex-col md:flex-row gap-16 items-center md:items-start text-center md:text-left">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex-1"
            >
                <h1 className="text-5xl md:text-7xl font-black mb-4 leading-none tracking-tighter italic text-white uppercase">
                    <TypingEffect
                        text={name}
                        speed={80}
                        glitchChance={1}
                        highlightStart={0}
                        highlightEnd={name.length}
                        highlightClassName="text-retro-white"
                        onComplete={() => {
                            setIsLoading(true);
                        }}
                    />
                </h1>

                {showContent && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl md:text-2xl font-black font-orbitron text-retro-pink mb-12 uppercase italic tracking-widest flex items-center justify-center md:justify-start"
                    >
                        <ScrambleEffect
                            text={`// ${role}`}
                            duration={800}
                            className="font-orbitron tracking-widest uppercase italic"
                        />
                    </motion.div>
                )}

                {showContent && pdfUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center md:justify-start"
                    >
                        <a
                            href={pdfUrl}
                            download="Ivan_Deineka_CV.pdf"
                            className="group flex items-center gap-3 px-6 py-3 bg-retro-cyan/10 border border-retro-cyan transition-all duration-300 font-orbitron uppercase text-sm tracking-widest relative overflow-hidden"
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-retro-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                animate={{
                                    x: ['-100%', '200%'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            <FileText size={18} className="text-retro-cyan animate-pulse relative z-10" />
                            <span className="text-white relative z-10 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] font-bold">Boring Version (PDF)</span>
                            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-retro-cyan scale-x-100 transition-transform duration-300 origin-left shadow-[0_0_10px_rgba(0,255,255,0.8)]"></div>
                        </a>
                    </motion.div>
                )}

                {isLoading && (
                    <LoadingBar onComplete={handleLoadingComplete} />
                )}
            </motion.div>
        </div>
    );
};
