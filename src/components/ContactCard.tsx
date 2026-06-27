import React from 'react';
import { motion } from 'framer-motion';
import { Check, Link as ExternalLink, Copy } from 'lucide-react';
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
            border: isCopied ? 'border-dusty-blue bg-soft-surface/90' : 'border-slate-200/60 bg-soft-surface/65 backdrop-blur-md hover:border-dusty-blue/40',
            text: `text-dusty-blue`,
            label: 'text-dusty-blue/85',
            iconBg: 'bg-dusty-blue/8',
            gradient: 'via-dusty-blue/5',
            boxShadow: 'none',
            accent: 'text-sage-green'
        },
        pink: {
            border: isCopied ? 'border-sage-green bg-soft-surface/90' : 'border-slate-200/60 bg-soft-surface/65 backdrop-blur-md hover:border-sage-green/40',
            text: `text-sage-green`,
            label: 'text-sage-green/85',
            iconBg: 'bg-sage-green/8',
            gradient: 'via-sage-green/5',
            boxShadow: 'none',
            accent: 'text-dusty-blue'
        }
    };

    const theme = isPink ? styles.pink : styles.cyan;

    return (
        <div
            onClick={() => {
                if (isExternal) {
                    window.open(link, '_blank', 'noopener,noreferrer');
                } else {
                    onCopy(value, type);
                }
            }}
            onMouseEnter={() => onHover(type)}
            className={cn(
                "relative group cursor-pointer border px-4 py-3 transition-all duration-300 overflow-hidden rounded-xl",
                theme.border
            )}
            style={{ boxShadow: isCopied ? theme.boxShadow : 'none' }}
        >
            <div className={cn("absolute inset-0 bg-gradient-to-r from-transparent to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]", theme.gradient)}></div>
            <div className="grid grid-cols-[3rem_1fr_auto] items-center gap-2 relative z-10 w-full">
                <div className={cn(
                    "w-10 h-10 flex items-center justify-center transition-colors duration-300 flex-shrink-0 rounded-lg",
                    theme.iconBg,
                    isCopied ? theme.accent : theme.text
                )}>
                    {isCopied ? <Check size={18} /> : React.createElement(icon, { size: 18 })}
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className={cn("text-[10px] font-bold tracking-wider uppercase", theme.label)}>{label}</span>
                    <motion.div
                        key={displayValue}
                        initial={{ opacity: 0, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-xs font-bold font-mono text-slate-800 truncate tracking-wider uppercase"
                    >
                        {displayValue}
                    </motion.div>
                </div>
                <div className="flex items-center gap-2">
                    {isCopied && (
                        <motion.span initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }} className={cn("text-[9px] font-bold uppercase tracking-wider", theme.accent)}>Copied</motion.span>
                    )}
                    {isExternal ? (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={cn("p-2 rounded-lg transition-colors", isPink ? "text-sage-green/40 hover:text-sage-green hover:bg-sage-green/10" : "text-dusty-blue/40 hover:text-dusty-blue hover:bg-dusty-blue/10")}
                            title={`Open ${label}`}
                        >
                            <ExternalLink size={16} />
                        </a>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onCopy(value, type);
                            }}
                            className={cn("p-2 rounded-lg transition-colors", isPink ? "text-sage-green/40 hover:text-sage-green hover:bg-sage-green/10" : "text-dusty-blue/40 hover:text-dusty-blue hover:bg-dusty-blue/10")}
                            title={`Copy ${label}`}
                        >
                            <Copy size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
