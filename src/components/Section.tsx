import { type LucideIcon } from 'lucide-react';
import { cn } from '../utils/utils';

interface SectionProps {
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const Section = ({ title, icon: Icon, children, className, id }: SectionProps) => (
    <section id={id} className={cn("mb-16 scroll-mt-20", className)}>
        <div className="flex items-center gap-3 mb-6 group">
            <Icon size={16} className="text-dusty-blue" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-[0.2em]">
                {title}
            </h2>
            <div className="flex-1 h-[1px] bg-slate-300/60 ml-2"></div>
        </div>
        {children}
    </section>
);
