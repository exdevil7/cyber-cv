import { useState, useCallback, useEffect } from 'react';
import { MapPin, Phone, Mail, Linkedin, Github, Lock } from 'lucide-react';
import { ContactCard } from '../components/ContactCard';
import { motion } from 'framer-motion';
import { vault } from '../utils/vault';


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
            {/* Location Card */}
            <div
                className="relative group border px-4 py-3 transition-all duration-300 overflow-hidden border-slate-200/60 bg-soft-surface/65 backdrop-blur-xl rounded-xl hover:border-slate-300/60 shadow-sm"
                onMouseEnter={() => bruteForceReveal('location')}
            >
                <div className="grid grid-cols-[3rem_1fr] items-center gap-2 relative z-10 w-full">
                    <div className="w-10 h-10 flex items-center justify-center text-dusty-blue flex-shrink-0 bg-dusty-blue/10 rounded-lg">
                        {revealState.location ? <MapPin size={18} /> : <Lock size={18} className="text-slate-500" />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-2">
                            Location
                        </span>
                        <motion.div
                            key={revealState.location ? 'revealed' : 'hidden'}
                            initial={{ opacity: 0, y: 2 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-xs font-bold font-mono text-slate-800 tracking-wider uppercase"
                        >
                            {revealState.location ? decrypted.location : "Hover to Reveal"}
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full">
                <ContactCard
                    type="phone"
                    icon={Phone}
                    label="Phone"
                    value={decrypted.phone}
                    displayValue={revealState.phone ? decrypted.phone : 'Hover to Reveal'}
                    link={`tel:${decrypted.phone}`}
                    isRevealed={revealState.phone}
                    onCopy={handleCopy}
                    onHover={(type) => bruteForceReveal(type as keyof typeof revealState)}
                    isCopied={copiedStates['phone']}
                />
                <ContactCard
                    type="email"
                    icon={Mail}
                    label="Email"
                    value={decrypted.email}
                    displayValue={revealState.email ? decrypted.email : 'Hover to Reveal'}
                    link={`mailto:${decrypted.email}`}
                    isRevealed={revealState.email}
                    onCopy={handleCopy}
                    onHover={(type) => bruteForceReveal(type as keyof typeof revealState)}
                    isCopied={copiedStates['email']}
                />
                <ContactCard
                    type="linkedin"
                    icon={Linkedin}
                    label="LinkedIn"
                    value={decrypted.linkedin}
                    displayValue={revealState.linkedin ? 'ivan-deineka' : 'Hover to Reveal'}
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
                    label="GitHub"
                    value={decrypted.github}
                    displayValue={revealState.github ? 'exdevil7' : 'Hover to Reveal'}
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
