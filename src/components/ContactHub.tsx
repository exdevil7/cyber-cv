import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Check, Link as ExternalLink, Mail, Linkedin, Github } from 'lucide-react';

interface ContactHubProps {
    data: {
        location: string;
        phone: string;
        email: string;
        linkedin: string;
        github: string;
    };
}

export const ContactHub = ({ data }: ContactHubProps) => {
    const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

    const handleCopy = useCallback((text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopiedStates((prev) => ({ ...prev, [type]: true }));
        setTimeout(() => {
            setCopiedStates((prev) => ({ ...prev, [type]: false }));
        }, 2000);
    }, []);

    const renderContactCard = (
        type: string,
        icon: React.ElementType,
        label: string,
        value: string,
        displayValue: string,
        link: string,
        isExternal: boolean = false
    ) => {
        const isCopied = copiedStates[type];
        const colorClass = ['email', 'github'].includes(type) ? 'retro-pink' : 'retro-cyan';
        const borderClass = isCopied
            ? `border-${colorClass}`
            : `border-${colorClass}/20 bg-retro-purple/5 hover:border-${colorClass}/60 hover:bg-${colorClass}/5`;

        return (
            <div
                onClick={() => handleCopy(value, type)}
                className={`relative group cursor-pointer border px-4 py-3 transition-all duration-500 overflow-hidden ${borderClass}`}
                style={{ boxShadow: isCopied ? `0 0 20px rgba(${colorClass === 'retro-cyan' ? '0, 255, 255' : '255, 0, 255'}, 0.4)` : 'none' }}
            >
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${colorClass}/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]`}></div>
                <div className="grid grid-cols-[3rem_1fr_auto] items-center gap-2 relative z-10 w-full">
                    <div className={`w-10 h-10 flex items-center justify-center transition-colors duration-300 flex-shrink-0 bg-${colorClass}/10 rounded-sm ${isCopied ? (colorClass === 'retro-cyan' ? 'text-retro-pink' : 'text-retro-cyan') : `text-${colorClass}`}`}>
                        {isCopied ? <Check size={18} /> : React.createElement(icon, { size: 18 })}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className={`text-[8px] font-black font-orbitron tracking-[0.2em] text-${colorClass}/60 uppercase`}>{label}</span>
                        <span className="text-xs font-bold font-mono text-white truncate">{displayValue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {isCopied && (
                            <motion.span initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} className={`text-[8px] font-black font-orbitron text-${colorClass === 'retro-cyan' ? 'retro-pink' : 'retro-cyan'} uppercase`}>Copied</motion.span>
                        )}
                        <a
                            href={link}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            onClick={(e) => e.stopPropagation()}
                            className={`p-2 text-${colorClass}/40 hover:text-${colorClass} hover:bg-${colorClass}/10 rounded-sm`}
                            title={label}
                        >
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="lg:w-2/5 w-full flex-shrink-0 flex flex-col gap-4">
            {/* Premium Location Card (Non-interactive) */}
            <div className="relative group border px-4 py-3 transition-all duration-500 overflow-hidden border-retro-purple/20 bg-retro-purple/5 hover:border-retro-purple/40">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-retro-purple/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                <div className="grid grid-cols-[3rem_1fr] items-center gap-2 relative z-10 w-full">
                    <div className="w-10 h-10 flex items-center justify-center text-retro-cyan flex-shrink-0 bg-retro-purple/10 rounded-sm">
                        <MapPin size={18} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black font-orbitron tracking-[0.2em] text-retro-purple/60 uppercase flex items-center gap-2">
                            Current_Sector
                            <span className="flex gap-[2px]">
                                <span className="w-[2px] h-2 bg-retro-purple animate-heartbeat"></span>
                                <span className="w-[2px] h-2 bg-retro-purple animate-heartbeat [animation-delay:0.2s]"></span>
                                <span className="w-[2px] h-2 bg-retro-purple animate-heartbeat [animation-delay:0.4s]"></span>
                            </span>
                        </span>
                        <span className="text-xs font-bold font-mono text-white tracking-widest uppercase">{data.location}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full">
                {renderContactCard('phone', Phone, 'Phone_Line', data.phone, data.phone, `tel:${data.phone}`)}
                {renderContactCard('email', Mail, 'E-Mail_Address', data.email, data.email, `mailto:${data.email}`)}
                {renderContactCard('linkedin', Linkedin, 'LinkedIn_Portal', data.linkedin, 'ivan-deineka', data.linkedin, true)}
                {renderContactCard('github', Github, 'GitHub_Archive', data.github, 'exdevil7', data.github, true)}
            </div>
        </div>
    );
};

import React from 'react';
