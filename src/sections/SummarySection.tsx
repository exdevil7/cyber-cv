import { useState } from 'react';
import { HighlightedText } from '../components/HighlightedText';
import { SystemHud } from '../components/SystemHud';
import { MessageSquare, X, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SummarySectionProps {
    summary: string;
    hudData: {
        expLevel: string;
        engine: string;
        status: string;
    };
    intel: {
        id: string;
        type: string;
        label?: string;
        content?: string;
        trackId?: string;
        footer?: string;
        datetime?: string;
    }[];
}

export const SummarySection = ({ summary, hudData, intel }: SummarySectionProps) => {
    const [isMessagesOpen, setIsMessagesOpen] = useState(false);
    const [isAudioOpen, setIsAudioOpen] = useState(false);
    const [hasOpenedAudio, setHasOpenedAudio] = useState(false);
    const textNotes = intel.filter(item => item.type === 'text');
    const audioNotes = intel.filter(item => item.type === 'audio');

    return (
        <div className="lg:w-3/5 w-full flex-shrink-0 flex flex-col gap-6">
            {/* Stats Bar with Icons */}
            <SystemHud hudData={hudData}>
                <div className="flex gap-2">
                    {textNotes.length > 0 && (
                        <button
                            onClick={() => setIsMessagesOpen(true)}
                            className="p-1.5 text-dusty-blue hover:text-sage-green hover:bg-sage-green/10 rounded-lg transition-all duration-300 relative group"
                            title="Messages"
                        >
                            <MessageSquare size={16} />
                            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-sage-green text-[9px] font-bold text-white scale-90 group-hover:scale-100 transition-transform">
                                {textNotes.length}
                            </span>
                        </button>
                    )}
                    {audioNotes.length > 0 && (
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsAudioOpen(!isAudioOpen);
                                    setHasOpenedAudio(true);
                                }}
                                className={`p-1.5 rounded-lg transition-all duration-300 relative ${isAudioOpen || hasOpenedAudio ? 'text-sage-green bg-sage-green/10' : 'text-dusty-blue hover:text-sage-green hover:bg-sage-green/10'}`}
                                title="Focus Track"
                            >
                                <Headphones size={16} />
                                <span className="absolute top-0.5 right-0.5 flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-green opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sage-green"></span>
                                </span>
                            </button>

                            <motion.div
                                initial={false}
                                animate={{ 
                                    opacity: isAudioOpen ? 1 : 0, 
                                    y: isAudioOpen ? 0 : -10, 
                                    scale: isAudioOpen ? 1 : 0.95,
                                    pointerEvents: isAudioOpen ? 'auto' : 'none'
                                }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 top-full mt-3 w-[320px] bg-soft-surface/80 backdrop-blur-xl border border-slate-200/60 rounded-xl shadow-xl z-40 overflow-hidden"
                            >
                                <iframe
                                    style={{ borderRadius: '0' }}
                                    src={`https://open.spotify.com/embed/track/${audioNotes[0].trackId}?utm_source=generator&theme=1`}
                                    width="100%"
                                    height="152"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </motion.div>
                        </div>
                    )}
                </div>
            </SystemHud>

            {/* Bio Summary Box */}
            <div className="text-base text-slate-700 font-medium leading-relaxed bg-soft-surface/65 backdrop-blur-xl p-6 border border-slate-200/60 border-l-2 border-dusty-blue whitespace-pre-wrap relative overflow-hidden rounded-xl shadow-sm">
                <div className="relative z-10">
                    <HighlightedText
                        content={summary}
                        rules={[
                            { pattern: /\b(Java|Spring|Spring Boot|Oracle|SQL|API|microservices|back-end|backend|Hibernate|Kafka)\b/g, className: 'font-bold text-slate-800' }
                        ]}
                    />
                </div>
            </div>




            {/* Messages Modal Overlay */}
            <AnimatePresence>
                {isMessagesOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm"
                        onClick={() => setIsMessagesOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
                            className="bg-soft-bg w-full max-w-md rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-5 border-b border-slate-200/60 bg-soft-surface/40">
                                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                    <MessageSquare size={16} className="text-dusty-blue" />
                                    Inbox
                                </h3>
                                <button
                                    onClick={() => setIsMessagesOpen(false)}
                                    className="p-1.5 text-slate-400 hover:text-sage-green hover:bg-sage-green/10 rounded-lg transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="p-5 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                                {textNotes.map(item => (
                                    <div key={item.id} className="p-5 bg-soft-surface/80 border border-slate-200/60 border-l-4 border-sage-green/50 rounded-xl text-sm leading-relaxed text-slate-600 shadow-sm">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="font-bold text-[10px] text-slate-500 uppercase tracking-widest font-mono">{item.label || 'Profile Memo'}</div>
                                            {item.datetime && <div className="text-[9px] text-dusty-blue font-mono tracking-wider">{item.datetime}</div>}
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">{item.content}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
