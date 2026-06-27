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
        <div className="flex flex-col xl:flex-row flex-wrap gap-x-8 gap-y-3 bg-soft-surface/40 border border-slate-200/60 rounded-xl p-4 md:px-5 text-[11px] w-full font-mono text-slate-500 shadow-sm items-start xl:items-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:flex xl:flex-wrap gap-x-8 gap-y-3 w-full xl:w-auto">
                <div className="flex items-center justify-between xl:justify-start gap-2">
                    <span className="text-slate-500 uppercase">Experience:</span>
                    <span className="font-semibold text-dusty-blue">{hudData.expLevel === '07_Y' ? '7 Years' : hudData.expLevel}</span>
                </div>

                <div className="flex items-center justify-between xl:justify-start gap-2">
                    <span className="text-slate-500 uppercase">Focus:</span>
                    <span className="font-semibold text-slate-800">{hudData.engine === 'JAVA_SPRING' ? 'Java & Spring' : hudData.engine}</span>
                </div>

                <div className="flex items-center justify-between xl:justify-start gap-2">
                    <span className="text-slate-500 uppercase">Status:</span>
                    <span className="font-semibold text-sage-green uppercase">{hudData.status === 'HIRED' ? 'Hired / Active' : hudData.status}</span>
                </div>
            </div>

            {children && (
                <div className="mt-1 xl:mt-0 xl:ml-auto flex items-center w-full xl:w-auto justify-between xl:justify-end border-t border-slate-200/60 xl:border-t-0 pt-3 xl:pt-0">
                    <span className="xl:hidden text-slate-500 uppercase">System:</span>
                    <div className="flex items-center gap-2">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};
