import { Terminal, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypingEffect } from '../components/TypingEffect';
import { ScrambleEffect } from '../components/ScrambleEffect';
import { useState } from 'react';
import { cn } from '../utils/utils';

interface SummarySectionProps {
    summary: string;
    hudData: {
        expLevel: string;
        engine: string;
        status: string;
    };
}

export const SummarySection = ({ summary, hudData }: SummarySectionProps) => {
    const [isMessageOpen, setIsMessageOpen] = useState(false);

    return (
        <div className="lg:w-3/5 w-full flex-shrink-0 flex flex-col">
            {/* System HUD Status Bar (Responsive Grid) */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 lg:flex lg:flex-nowrap lg:gap-10 mb-8 border-y border-retro-cyan/10 py-4 relative group terminal-glow">
                <div className="absolute inset-0 bg-retro-cyan/5 opacity-20 crt-flicker pointer-events-none"></div>

                <div className="px-3 border-l-4 border-retro-cyan flex flex-col whitespace-nowrap relative z-10">
                    <span className="text-[8px] font-black font-orbitron text-retro-cyan/40 uppercase tracking-[0.2em]">Exp_Level</span>
                    <span className="text-xs lg:text-sm font-bold font-mono text-retro-cyan">{hudData.expLevel}</span>
                </div>

                <div className="px-3 border-l-4 border-retro-purple flex flex-col whitespace-nowrap relative z-10">
                    <span className="text-[8px] font-black font-orbitron text-retro-purple/40 uppercase tracking-[0.2em]">Engine</span>
                    <span className="text-xs lg:text-sm font-bold font-mono text-retro-purple">{hudData.engine}</span>
                </div>

                <div className="px-3 border-l-4 border-retro-pink flex flex-col whitespace-nowrap relative z-10">
                    <span className="text-[8px] font-black font-orbitron text-retro-pink/40 uppercase tracking-[0.2em]">Status</span>
                    <span className="text-xs lg:text-sm font-bold font-mono text-retro-pink italic uppercase tracking-tighter">{hudData.status}</span>
                </div>

                {/* Message HUD Segment */}
                <div className="px-3 border-l-4 border-retro-pink flex flex-col whitespace-nowrap relative z-10 group/msg cursor-pointer" onClick={() => setIsMessageOpen(!isMessageOpen)}>
                    <div className="flex items-center gap-2">
                        <span className={cn(
                            "text-[8px] font-black font-orbitron uppercase tracking-[0.2em] transition-colors",
                            isMessageOpen ? "text-retro-pink" : "text-retro-pink/40 group-hover/msg:text-retro-pink/80"
                        )}>Message</span>
                        {!isMessageOpen && (
                            <span className="w-1.5 h-1.5 bg-retro-pink rounded-full animate-pulse"></span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <MessageSquare size={12} className={cn(isMessageOpen ? "text-retro-pink" : "text-retro-pink/60 group-hover/msg:text-retro-pink")} />
                        <span className={cn(
                            "text-xs lg:text-sm font-bold font-mono transition-colors",
                            isMessageOpen ? "text-retro-pink" : "text-white/60 group-hover/msg:text-white"
                        )}>
                            {isMessageOpen ? 'DECRYPTING...' : '1_NEW_INTEL'}
                        </span>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMessageOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-6"
                    >
                        <div className="p-4 bg-retro-pink/5 border-l-4 border-retro-pink/40 relative group/drawer terminal-glow-purple">
                            <div className="absolute inset-0 bg-retro-purple/5 crt-flicker pointer-events-none"></div>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Terminal size={12} className="text-retro-pink" />
                                    <span className="text-[8px] font-black font-orbitron text-retro-pink tracking-widest uppercase">Decrypted_Intel: File_01</span>
                                </div>
                                <button
                                    onClick={() => setIsMessageOpen(false)}
                                    className="text-[10px] uppercase font-orbitron text-retro-pink/40 hover:text-retro-pink transition-colors"
                                >
                                    [Close_Session]
                                </button>
                            </div>
                            <p className="text-sm font-bold font-mono text-white/90 italic leading-relaxed pl-4 border-l border-retro-pink/20">
                                {">> "}
                                <ScrambleEffect
                                    text="DECRYPTED: While waiting for my next mission, I started vibecoding. [SUCCESS] One Friday night later, this dashboard went live. Ready to deploy on your signal. // EOF"
                                    duration={2000}
                                    className="font-mono lowercase italic tracking-normal normal-case"
                                />
                            </p>
                            <div className="mt-4 flex items-center justify-between text-[7px] font-mono uppercase tracking-[0.2em] text-retro-pink/30">
                                <span>Auth_Sequence: v-engineer-01 // Verified</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-1 h-1 bg-retro-pink/20 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <p className="text-xl text-cyan-100/80 font-medium leading-relaxed backdrop-blur-sm bg-retro-purple/5 p-6 border-l-4 border-retro-cyan mb-6 lg:mb-8 whitespace-pre-wrap relative overflow-hidden terminal-glow">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
                <TypingEffect
                    text={summary}
                    speed={1}
                    glitchChance={0.15}
                    glitchIntensity={0.2}
                    rules={[
                        { pattern: /\b(Java|Spring|Spring Boot|Oracle|SQL)\b/g, className: 'text-retro-cyan font-bold' },
                        { pattern: /\b(API|microservices|back-end|backend|Hibernate|Kafka)\b/g, className: 'text-retro-pink font-bold' }
                    ]}
                />
            </p>

            <div className="flex-grow"></div>
        </div >
    );
};
