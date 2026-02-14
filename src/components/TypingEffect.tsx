import React, { useState, useEffect, useRef } from 'react';

interface HighlightRule {
    pattern: RegExp;
    className: string;
}

interface TypingEffectProps {
    text: string;
    className?: string;
    speed?: number;
    glitchChance?: number;
    highlightStart?: number;
    highlightEnd?: number;
    highlightClassName?: string;
    rules?: HighlightRule[];
    onComplete?: () => void;
}

const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
const glitchColors = ['#ff00ff', '#00ffff', '#00ff80', '#8000ff'];

export const TypingEffect = ({
    text,
    className = '',
    speed = 100,
    glitchChance = 0.3,
    highlightStart,
    highlightEnd,
    highlightClassName = '',
    rules = [],
    onComplete
}: TypingEffectProps) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showingGlitch, setShowingGlitch] = useState(false);
    const [glitchColor, setGlitchColor] = useState('');
    const hasCompletedRef = useRef(false);

    useEffect(() => {
        if (currentIndex < text.length) {
            if (showingGlitch) return;

            const timeout = setTimeout(() => {
                if (currentIndex < text.length && Math.random() < glitchChance) {
                    setShowingGlitch(true);
                    const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    const randomColor = glitchColors[Math.floor(Math.random() * glitchColors.length)];
                    setGlitchColor(randomColor);
                    setDisplayText(prev => prev + glitchChar);

                    setTimeout(() => {
                        setDisplayText(prev => prev.slice(0, -1) + text[currentIndex]);
                        setCurrentIndex(prev => prev + 1);
                        setShowingGlitch(false);
                        setGlitchColor('');
                    }, 100);
                } else {
                    setDisplayText(prev => prev + text[currentIndex]);
                    setCurrentIndex(prev => prev + 1);
                }
            }, speed);

            return () => clearTimeout(timeout);
        } else if (currentIndex === text.length && onComplete && !hasCompletedRef.current) {
            hasCompletedRef.current = true;
            onComplete();
        }
    }, [currentIndex, text, speed, glitchChance, showingGlitch, onComplete]);

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

    return (
        <span className={className} style={{ display: 'inline-block' }}>
            {showingGlitch && glitchColor ? (
                <>
                    {renderText(displayText.slice(0, -1))}
                    <span style={{ color: glitchColor, fontWeight: 'bold' }}>{displayText.slice(-1)}</span>
                </>
            ) : (
                renderText(displayText)
            )}
        </span>
    );
};
