import { motion } from 'framer-motion';

export const SkillBadge = ({ skill, url }: { skill: string; url?: string }) => {
    const Component = url ? motion.a : motion.span;
    const additionalProps = url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {};

    return (
        <Component
            whileHover={{ scale: 1.1, rotate: -2 }}
            className={`px-4 py-1 text-xs font-bold uppercase trekking-widest bg-retro-black border border-retro-cyan/40 text-retro-cyan hover:border-retro-pink hover:text-retro-pink shadow-[2px_2px_0px_rgba(255,0,255,0.3)] transition-all ${url ? "cursor-pointer" : ""}`}
            {...additionalProps}
        >
            {skill}
        </Component>
    );
};
