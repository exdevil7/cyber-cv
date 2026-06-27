import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { Section } from '../components/Section';
import { SkillBadge } from '../components/SkillBadge';

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
        <Section title="Core Skills" icon={Code2} id="skills">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {skills.map((skillGroup, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] }}
                        className="card group"
                    >
                        <h3 className="text-xs font-bold text-slate-700 mb-5 uppercase tracking-widest">{skillGroup.category}</h3>
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
