import React, { useState, useEffect, useRef, useMemo } from 'react';
import { cn } from '../utils/utils';

interface HighlightRule {
    pattern: RegExp;
    className: string;
}

interface TypingEffectProps {
    text: string;
    className?: string;
    speed?: number;
    glitchChance?: number;
    glitchIntensity?: number; // 0 to 1, default 0.3
    highlightStart?: number;
    highlightEnd?: number;
    highlightClassName?: string;
    rules?: HighlightRule[];
    onComplete?: () => void;
}

import { GLITCH_CHARS, GLITCH_COLORS } from '../constants/glitch';

const ChromaticText = ({ char, color }: { char: string; color: string }) => {
    return (
        <span className="relative inline-block font-black" style={{ color }}>
            <span className="absolute top-0 left-0 -translate-x-[1px] text-[#ff003c] opacity-70 mix-blend-screen animate-pulse pointer-events-none">
                {char}
            </span>
            <span className="absolute top-0 left-0 translate-x-[1px] text-[#00f6ff] opacity-70 mix-blend-screen animate-pulse pointer-events-none" style={{ animationDelay: '50ms' }}>
                {char}
            </span>
            <span className="relative z-10">{char}</span>
        </span>
    );
};

export const TypingEffect = ({
    text,
    className = '',
    speed = 100,
    glitchChance = 0.3,
    glitchIntensity = 0.3,
    highlightStart,
    highlightEnd,
    highlightClassName = '',
    rules = [],
    onComplete
}: TypingEffectProps) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cycleCount, setCycleCount] = useState(0);
    const [isCycling, setIsCycling] = useState(false);
    const [currentGlitchChar, setCurrentGlitchChar] = useState('');
    const [glitchColor, setGlitchColor] = useState('');
    const hasCompletedRef = useRef(false);

    // Max cycles based on intensity (0.3 intensity = ~3-4 cycles)
    const maxCycles = useMemo(() => Math.floor(glitchIntensity * 15) + 1, [glitchIntensity]);

    useEffect(() => {
        if (currentIndex < text.length) {
            const char = text[currentIndex];

            // Determine variable speed (Reduced pauses for better UX)
            let nextDelay = speed;
            if (char === '.') nextDelay = speed * 3; // Was 5
            else if (char === ',' || char === ':' || char === ';') nextDelay = speed * 1.5; // Was 3
            else if (char === ' ') nextDelay = speed * 0.3; // Was 0.4
            else if (Math.random() < 0.05) nextDelay = speed * 1.5; // Was 0.1 and 2

            const timeout = setTimeout(() => {
                const shouldGlitch = Math.random() < glitchChance;

                if (shouldGlitch && !isCycling) {
                    setIsCycling(true);
                    setCycleCount(0);
                } else if (!isCycling) {
                    setDisplayText(prev => prev + char);
                    setCurrentIndex(prev => prev + 1);
                }
            }, nextDelay);

            return () => clearTimeout(timeout);
        } else if (currentIndex === text.length && !hasCompletedRef.current) {
            hasCompletedRef.current = true;
            onComplete?.();
        }
    }, [currentIndex, text, speed, glitchChance, isCycling, onComplete]);

    // Cycle logic (Decryption Effect)
    useEffect(() => {
        if (isCycling) {
            const cycleTimeout = setTimeout(() => {
                if (cycleCount < maxCycles) {
                    const randomChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                    const randomColor = GLITCH_COLORS[Math.floor(Math.random() * GLITCH_COLORS.length)];
                    setCurrentGlitchChar(randomChar);
                    setGlitchColor(randomColor);
                    setCycleCount(prev => prev + 1);
                } else {
                    setDisplayText(prev => prev + text[currentIndex]);
                    setCurrentIndex(prev => prev + 1);
                    setIsCycling(false);
                    setCycleCount(0);
                    setCurrentGlitchChar('');
                    setGlitchColor('');
                }
            }, 30); // Faster cycling (Was 40)

            return () => clearTimeout(cycleTimeout);
        }
    }, [isCycling, cycleCount, maxCycles, currentIndex, text]);

    const renderText = (content: string) => {
        if (rules.length === 0 && (highlightStart === undefined || highlightEnd === undefined)) {
            return content;
        }

        if (rules.length === 0) {
            const before = content.slice(0, highlightStart);
            const mid = content.slice(highlightStart, highlightEnd);
            const after = content.slice(highlightEnd);
            return (
                <>
                    {before}<span className={highlightClassName}>{mid}</span>{after}
                </>
            );
        }

        const result: (string | React.ReactNode)[] = [];
        let lastIndex = 0;
        const combinedRegex = new RegExp(rules.map(r => `(?:${r.pattern.source})`).join('|'), 'g');

        let match;
        while ((match = combinedRegex.exec(content)) !== null) {
            if (match.index > lastIndex) {
                result.push(content.slice(lastIndex, match.index));
            }

            const matchedText = match[0];
            const rule = rules.find(r => {
                const re = new RegExp(r.pattern.source, r.pattern.flags.replace('g', ''));
                return re.test(matchedText);
            });

            if (rule) {
                result.push(<span key={match.index} className={rule.className}>{matchedText}</span>);
            } else {
                result.push(matchedText);
            }

            lastIndex = combinedRegex.lastIndex;
            if (match[0].length === 0) combinedRegex.lastIndex++;
        }

        if (lastIndex < content.length) {
            result.push(content.slice(lastIndex));
        }

        return <>{result}</>;
    };

    const isFinished = currentIndex === text.length && !isCycling;

    return (
        <span className={cn(className, "inline-block")}>
            {renderText(displayText)}
            {isCycling && (
                <ChromaticText char={currentGlitchChar} color={glitchColor} />
            )}
            {!isFinished && (
                <span className="inline-block w-[3px] h-[1em] bg-retro-cyan ml-1 animate-pulse align-middle shadow-[0_0_8px_rgba(0,255,255,0.8)]"></span>
            )}
        </span>
    );
};
