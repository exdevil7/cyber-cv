import { useState, useEffect, useRef } from 'react';
import { cn } from '../utils/utils';

interface ScrambleEffectProps {
    text: string;
    className?: string;
    duration?: number; // Total duration in ms
    scrambleSpeed?: number; // Speed of character changes in ms
    onComplete?: () => void;
}

import { GLITCH_CHARS, GLITCH_COLORS } from '../constants/glitch';

export const ScrambleEffect = ({
    text,
    className = '',
    duration = 1000,
    onComplete
}: ScrambleEffectProps) => {
    const [displayText, setDisplayText] = useState('');
    const [fixedCount, setFixedCount] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const frameRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        startTimeRef.current = Date.now();
        setIsComplete(false);
        setFixedCount(0);

        const update = () => {
            const now = Date.now();
            const elapsed = now - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);

            const currentFixed = Math.floor(text.length * progress);
            setFixedCount(currentFixed);

            let result = '';
            for (let i = 0; i < text.length; i++) {
                if (i < currentFixed) {
                    result += text[i];
                } else if (text[i] === ' ') {
                    result += ' ';
                } else {
                    result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                }
            }

            setDisplayText(result);

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(update);
            } else {
                setDisplayText(text);
                setIsComplete(true);
                onComplete?.();
            }
        };

        frameRef.current = requestAnimationFrame(update);

        return () => cancelAnimationFrame(frameRef.current);
    }, [text, duration, onComplete]);

    return (
        <span className={cn(className)}>
            {displayText.split('').map((char, i) => {
                if (i < fixedCount || char === ' ') {
                    return <span key={i}>{char}</span>;
                }
                const randomColor = GLITCH_COLORS[Math.floor((i + displayText.length) % GLITCH_COLORS.length)];
                return (
                    <span key={i} style={{ color: randomColor }} className="font-bold">
                        {char}
                    </span>
                );
            })}
            {!isComplete && (
                <span className="inline-block w-2 H-[0.8em] bg-retro-pink ml-1 animate-pulse align-middle"></span>
            )}
        </span>
    );
};
