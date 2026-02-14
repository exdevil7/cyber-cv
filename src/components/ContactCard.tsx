import React from 'react';
import { motion } from 'framer-motion';
import { Check, Link as ExternalLink } from 'lucide-react';
import { ScrambleEffect } from './ScrambleEffect';
import { cn } from '../utils/utils';

export interface ContactCardProps {
    type: string;
    icon: React.ElementType;
    label: string;
    value: string;
    displayValue: string;
    link: string;
    isExternal?: boolean;
    isRevealed: boolean;
    onCopy: (text: string, type: string) => void;
    onHover: (type: string) => void;
    isCopied: boolean;
}

export const ContactCard = ({
    type,
    icon,
    label,
    value,
    displayValue,
    link,
    isExternal = false,
    onCopy,
    onHover,
    isCopied
}: ContactCardProps) => {
    const isPink = ['email', 'github'].includes(type);

    const styles = {
        cyan: {
            border: isCopied ? 'border-retro-cyan' : 'border-retro-cyan/20 bg-retro-purple/5 hover:border-retro-cyan/60 hover:bg-retro-cyan/5',
            text: `text-retro-cyan`,
            label: 'text-retro-cyan/60',
            iconBg: 'bg-retro-cyan/10',
            gradient: 'via-retro-cyan/5',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
            accent: 'text-retro-pink'
        },
        pink: {
            border: isCopied ? 'border-retro-pink' : 'border-retro-pink/20 bg-retro-purple/5 hover:border-retro-pink/60 hover:bg-retro-pink/5',
            text: `text-retro-pink`,
            label: 'text-retro-pink/60',
            iconBg: 'bg-retro-pink/10',
            gradient: 'via-retro-pink/5',
            boxShadow: '0 0 20px rgba(255, 0, 255, 0.4)',
            accent: 'text-retro-cyan'
        }
    };

    const theme = isPink ? styles.pink : styles.cyan;

    return (
        <div
            onClick={() => onCopy(value, type)}
            onMouseEnter={() => onHover(type)}
            className={cn(
                "relative group cursor-pointer border px-4 py-3 transition-all duration-500 overflow-hidden",
                theme.border
            )}
            style={{ boxShadow: isCopied ? theme.boxShadow : 'none' }}
        >
            <div className={cn("absolute inset-0 bg-gradient-to-r from-transparent to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]", theme.gradient)}></div>
            <div className="grid grid-cols-[3rem_1fr_auto] items-center gap-2 relative z-10 w-full">
                <div className={cn(
                    "w-10 h-10 flex items-center justify-center transition-colors duration-300 flex-shrink-0 rounded-sm",
                    theme.iconBg,
                    isCopied ? theme.accent : theme.text
                )}>
                    {isCopied ? <Check size={18} /> : React.createElement(icon, { size: 18 })}
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className={cn("text-[8px] font-black font-orbitron tracking-[0.2em] uppercase", theme.label)}>{label}</span>
                    <ScrambleEffect
                        text={displayValue}
                        className="text-xs font-bold font-mono text-white truncate font-orbitron tracking-widest uppercase"
                        duration={800}
                    />
                </div>
                <div className="flex items-center gap-2">
                    {isCopied && (
                        <motion.span initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} className={cn("text-[8px] font-black font-orbitron uppercase", theme.accent)}>Copied</motion.span>
                    )}
                    <a
                        href={link}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        onClick={(e) => e.stopPropagation()}
                        className={cn("p-2 rounded-sm transition-colors", isPink ? "text-retro-pink/40 hover:text-retro-pink hover:bg-retro-pink/10" : "text-retro-cyan/40 hover:text-retro-cyan hover:bg-retro-cyan/10")}
                        title={label}
                    >
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
};
