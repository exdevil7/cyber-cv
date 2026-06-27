export interface SystemHudProps {
    hudData: {
        expLevel: string;
        engine: string;
        status: string;
    };
    children?: React.ReactNode;
}

export const SystemHud = ({ hudData, children }: SystemHudProps) => {
    return (
        <div className="flex flex-wrap gap-x-8 gap-y-3 bg-soft-surface/40 border border-slate-200/60 rounded-xl p-4 text-[11px] w-full font-mono text-slate-500 shadow-sm">
            <div className="flex items-center gap-2">
                <span className="text-slate-500 uppercase">Experience:</span>
                <span className="font-semibold text-dusty-blue">{hudData.expLevel === '07_Y' ? '7 Years' : hudData.expLevel}</span>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-slate-500 uppercase">Focus:</span>
                <span className="font-semibold text-slate-800">{hudData.engine === 'JAVA_SPRING' ? 'Java & Spring' : hudData.engine}</span>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-slate-500 uppercase">Status:</span>
                <span className="font-semibold text-sage-green uppercase">{hudData.status === 'HIRED' ? 'Hired / Active' : hudData.status}</span>
            </div>
            {children && (
                <div className="ml-auto flex items-center">
                    {children}
                </div>
            )}
        </div>
    );
};
