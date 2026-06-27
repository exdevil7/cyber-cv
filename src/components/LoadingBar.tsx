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
            <div className="flex justify-between mb-2 text-[10px] font-bold uppercase tracking-wider text-dusty-blue">
                <span>Loading...</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-slate-200/80 border border-slate-300 overflow-hidden relative">
                <motion.div
                    className="h-full bg-dusty-blue absolute top-0 left-0"
                    initial={{ width: 0 }}
                    animate={{
                        width: `${progress}%`
                    }}
                    transition={{
                        duration: 0.7,
                        ease: [0, 0, 0.2, 1]
                    }}
                />
            </div>
        </div>
    );
};
