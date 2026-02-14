import { type LucideIcon } from 'lucide-react';

interface SectionProps {
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const Section = ({ title, icon: Icon, children, className, id }: SectionProps) => (
    <section id={id} className={`mb-20 scroll-mt-24 ${className || ''}`}>
        <div className="flex items-center gap-4 mb-10 group">
            <div className="p-3 bg-retro-purple/20 text-retro-cyan border border-retro-purple/40 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                <Icon size={24} className="group-hover:animate-pulse" />
            </div>
            <h2 className="text-3xl font-black text-slate-100 font-orbitron tracking-tighter uppercase italic neon-text-pink">
                {title}
            </h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-retro-purple/50 to-transparent ml-6 "></div>
        </div>
        {children}
    </section>
);
