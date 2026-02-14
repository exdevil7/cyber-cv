import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { Section } from './Section';
import { SkillBadge } from './SkillBadge';

interface SkillItem {
    name: string;
    url?: string;
}

interface SkillGroup {
    category: string;
    items: SkillItem[];
}

interface SkillsGridProps {
    skills: SkillGroup[];
}

export const SkillsGrid = ({ skills }: SkillsGridProps) => {
    return (
        <Section title="System Core" icon={Code2} id="skills">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {skills.map((skillGroup, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="card group hover:bg-retro-purple/10"
                    >
                        <h3 className="text-xs font-black text-retro-cyan mb-6 uppercase tracking-[0.2em] font-orbitron">{skillGroup.category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {skillGroup.items.map((skill, sIdx) => (
                                <SkillBadge key={sIdx} skill={skill.name} url={skill.url} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};
