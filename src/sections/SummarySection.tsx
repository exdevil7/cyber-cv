import { HighlightedText } from '../components/HighlightedText';
import { SystemHud } from '../components/SystemHud';

interface SummarySectionProps {
    summary: string;
    hudData: {
        expLevel: string;
        engine: string;
        status: string;
    };
    intel: {
        id: string;
        type: string;
        label: string;
        content?: string;
        trackId?: string;
        footer: string;
    }[];
}

export const SummarySection = ({ summary, hudData, intel }: SummarySectionProps) => {
    return (
        <div className="lg:w-3/5 w-full flex-shrink-0 flex flex-col">
            <SystemHud hudData={hudData} intel={intel} />

            <div className="text-xl text-cyan-100/80 font-medium leading-relaxed backdrop-blur-sm bg-retro-purple/5 p-6 border-l-4 border-retro-cyan mb-6 lg:mb-8 whitespace-pre-wrap relative overflow-hidden terminal-glow">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
                <div className="relative z-10">
                    <HighlightedText
                        content={summary}
                        rules={[
                            { pattern: /\b(Java|Spring|Spring Boot|Oracle|SQL)\b/g, className: 'text-retro-cyan font-bold' },
                            { pattern: /\b(API|microservices|back-end|backend|Hibernate|Kafka)\b/g, className: 'text-retro-pink font-bold' }
                        ]}
                    />
                </div>
            </div>

            <div className="flex-grow"></div>
        </div >
    );
};

