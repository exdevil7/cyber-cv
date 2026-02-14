import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TypingEffect } from '../components/TypingEffect';
import { LoadingBar } from '../components/LoadingBar';
import { ScrambleEffect } from '../components/ScrambleEffect';

interface HeroSectionProps {
    name: string;
    role: string;
    onContentReady?: () => void;
}

export const HeroSection = ({ name, role, onContentReady }: HeroSectionProps) => {
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

                {isLoading && (
                    <LoadingBar onComplete={handleLoadingComplete} />
                )}
            </motion.div>
        </div>
    );
};
