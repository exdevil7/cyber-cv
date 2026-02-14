import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const LoadingBar = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);
        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="w-full mb-12 relative group">
            <div className="flex justify-between mb-2 font-orbitron text-[10px] font-black uppercase tracking-[0.3em] text-retro-cyan">
                <span>System_Check...</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-retro-purple/20 border border-retro-purple/30 overflow-hidden relative">
                <motion.div
                    className="h-full bg-gradient-to-r from-retro-cyan via-retro-pink to-retro-cyan bg-[length:200%_100%] absolute top-0 left-0"
                    initial={{ width: 0 }}
                    animate={{
                        width: `${progress}%`,
                        backgroundPosition: ['0% 0%', '100% 0%']
                    }}
                    transition={{
                        width: { duration: 0.1 },
                        backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' }
                    }}
                />
                <div className="absolute inset-0 shadow-[0_0_10px_rgba(0,255,255,0.3)] pointer-events-none"></div>
            </div>
        </div>
    );
};
