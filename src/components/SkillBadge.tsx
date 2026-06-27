import { motion } from 'framer-motion';
import { cn } from '../utils/utils';

export const SkillBadge = ({ skill, url }: { skill: string; url?: string }) => {
    const Component = url ? motion.a : motion.span;
    const additionalProps = url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {};

    return (
        <Component
            whileHover={{ scale: 1.03 }}
            className={cn(
                "px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-soft-surface/60 border border-slate-200/60 text-dusty-blue hover:border-sage-green/40 hover:text-sage-green transition-all duration-300 rounded-full",
                url && "cursor-pointer"
            )}
            {...additionalProps}
        >
            {skill}
        </Component>
    );
};
