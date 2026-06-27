interface FooterProps {
    name: string;
    version: string;
}

export const Footer = ({ name, version }: FooterProps) => {
    return (
        <footer className="border-t border-slate-200/60 py-16 bg-soft-surface/40 backdrop-blur-xl relative z-20">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
                    Connect
                </div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 mb-4 flex flex-col md:flex-row items-center justify-center gap-2">
                    <span>© {new Date().getFullYear()} {name}.</span>
                    <span className="hidden md:inline">•</span>
                    <span>Version {version}</span>
                </p>
                <p className="text-[8px] uppercase tracking-[0.12em] text-slate-500">
                    React • Vite • Tailwind CSS
                </p>
            </div>
        </footer>
    );
};
