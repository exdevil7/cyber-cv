import React from 'react';

export interface HighlightRule {
    pattern: RegExp;
    className: string;
}

interface HighlightedTextProps {
    content: string;
    rules?: HighlightRule[];
}

export const HighlightedText = ({ content, rules = [] }: HighlightedTextProps) => {
    if (!rules || rules.length === 0) return <>{content}</>;

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
            const re = new RegExp(r.pattern.source);
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

    return result.length > 0 ? <>{result}</> : <>{content}</>;
};
