interface FooterProps {
    name: string;
    version: string;
}

export const Footer = ({ name, version }: FooterProps) => {
    return (
        <footer className="border-t border-retro-purple/30 py-20 bg-retro-black/50 relative z-20">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <div className="text-4xl font-black font-orbitron italic gradient-text mb-6 drop-shadow-[0_0_10px_rgba(255,0,255,0.3)]">
                    ESTABLISH_CONNECTION
                </div>
                <p className="text-xs font-black font-orbitron uppercase tracking-[0.5em] text-retro-purple mb-4 opacity-50">
                    © {new Date().getFullYear()} {name}. REL_{version.replace(/^v/i, '').toUpperCase()}
                </p>
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-600">
                    INITIALIZED_WITH: REACT_VITE_TAILWIND_V4
                </p>
            </div>
        </footer>
    );
};
