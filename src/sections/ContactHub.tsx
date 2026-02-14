import { useState, useCallback, useEffect } from 'react';
import { MapPin, Phone, Mail, Linkedin, Github, Lock } from 'lucide-react';
import { ScrambleEffect } from '../components/ScrambleEffect';
import { ContactCard } from '../components/ContactCard';
import { vault } from '../utils/vault';
import { cn } from '../utils/utils';

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
    const [revealState, setRevealState] = useState({
        location: false,
        phone: false,
        email: false,
        linkedin: false,
        github: false
    });

    useEffect(() => {
        const scheduleReveal = (key: keyof typeof revealState, delay: number) => {
            return setTimeout(() => {
                setRevealState(prev => ({ ...prev, [key]: true }));
            }, delay);
        };

        const timers = [
            scheduleReveal('location', 1000),
            scheduleReveal('phone', 1600),
            scheduleReveal('email', 2200),
            scheduleReveal('linkedin', 2800),
            scheduleReveal('github', 3400)
        ];

        return () => timers.forEach(timer => clearTimeout(timer));
    }, []);

    const bruteForceReveal = (key: keyof typeof revealState) => {
        if (!revealState[key]) {
            setRevealState(prev => ({ ...prev, [key]: true }));
        }
    };

    // Decode sensitive data
    const decrypted = {
        location: vault.decode(data.location),
        phone: vault.decode(data.phone),
        email: vault.decode(data.email),
        linkedin: vault.decode(data.linkedin),
        github: vault.decode(data.github),
    };


    const handleCopy = useCallback((text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopiedStates((prev) => ({ ...prev, [type]: true }));
        setTimeout(() => {
            setCopiedStates((prev) => ({ ...prev, [type]: false }));
        }, 2000);
    }, []);

    return (
        <div className="lg:w-2/5 w-full flex-shrink-0 flex flex-col gap-4">
            {/* Premium Location Card (Non-interactive) */}
            <div
                className="relative group border px-4 py-3 transition-all duration-500 overflow-hidden border-retro-purple/20 bg-retro-purple/5 hover:border-retro-purple/40"
                onMouseEnter={() => bruteForceReveal('location')}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-retro-purple/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                <div className="grid grid-cols-[3rem_1fr] items-center gap-2 relative z-10 w-full">
                    <div className="w-10 h-10 flex items-center justify-center text-retro-cyan flex-shrink-0 bg-retro-purple/10 rounded-sm">
                        {revealState.location ? <MapPin size={18} /> : <Lock size={18} className="text-retro-purple/40" />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black font-orbitron tracking-[0.2em] text-retro-purple/60 uppercase flex items-center gap-2">
                            {revealState.location ? 'Current_Sector' : 'SECTOR_ENCRYPTED'}
                            <span className="flex gap-[2px]">
                                <span className={cn("w-[2px] h-2 bg-retro-purple animate-heartbeat", !revealState.location && "bg-retro-purple/20")}></span>
                                <span className={cn("w-[2px] h-2 bg-retro-purple animate-heartbeat [animation-delay:0.2s]", !revealState.location && "bg-retro-purple/20")}></span>
                                <span className={cn("w-[2px] h-2 bg-retro-purple animate-heartbeat [animation-delay:0.4s]", !revealState.location && "bg-retro-purple/20")}></span>
                            </span>
                        </span>
                        <ScrambleEffect
                            text={revealState.location ? decrypted.location : "DATA_LOCKED_BY_CYBER_VAULT"}
                            className="text-xs font-bold font-mono text-white tracking-widest uppercase font-orbitron"
                            duration={revealState.location ? 800 : 0}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full">
                <ContactCard
                    type="phone"
                    icon={Phone}
                    label={revealState.phone ? 'Phone_Line' : 'LINE_LOCKED'}
                    value={decrypted.phone}
                    displayValue={revealState.phone ? decrypted.phone : 'XXXXXXXXXXXX'}
                    link={`tel:${decrypted.phone}`}
                    isRevealed={revealState.phone}
                    onCopy={handleCopy}
                    onHover={(type) => bruteForceReveal(type as keyof typeof revealState)}
                    isCopied={copiedStates['phone']}
                />
                <ContactCard
                    type="email"
                    icon={Mail}
                    label={revealState.email ? 'E-Mail_Address' : 'CHNL_ENCRYPTED'}
                    value={decrypted.email}
                    displayValue={revealState.email ? decrypted.email : 'REDACTED@VAULT.OS'}
                    link={`mailto:${decrypted.email}`}
                    isRevealed={revealState.email}
                    onCopy={handleCopy}
                    onHover={(type) => bruteForceReveal(type as keyof typeof revealState)}
                    isCopied={copiedStates['email']}
                />
                <ContactCard
                    type="linkedin"
                    icon={Linkedin}
                    label={revealState.linkedin ? 'LinkedIn_Portal' : 'PORTAL_LOCKED'}
                    value={decrypted.linkedin}
                    displayValue={revealState.linkedin ? 'ivan-deineka' : 'IDENT_LOCKED'}
                    link={decrypted.linkedin}
                    isExternal={true}
                    isRevealed={revealState.linkedin}
                    onCopy={handleCopy}
                    onHover={(type) => bruteForceReveal(type as keyof typeof revealState)}
                    isCopied={copiedStates['linkedin']}
                />
                <ContactCard
                    type="github"
                    icon={Github}
                    label={revealState.github ? 'GitHub_Archive' : 'ARCHIVE_LOCKED'}
                    value={decrypted.github}
                    displayValue={revealState.github ? 'exdevil7' : 'IDENT_LOCKED'}
                    link={decrypted.github}
                    isExternal={true}
                    isRevealed={revealState.github}
                    onCopy={handleCopy}
                    onHover={(type) => bruteForceReveal(type as keyof typeof revealState)}
                    isCopied={copiedStates['github']}
                />
            </div>
        </div>
    );
};

