export default function PlayerDiceCard({
    name,
    colorId,
    time,
    children, // <Dice />
}) {
    const colors = {
        1: "bg-red-500",
        2: "bg-green-500",
        3: "bg-yellow-400",
        4: "bg-blue-500",
    };

    const percentage = (time / 60) * 100;

    return (
        <div className="mx-auto w-72 rounded-2xl border border-slate-700 bg-slate-800 p-3 shadow-lg">
            <div className="flex items-center gap-4">
                {/* Dice (6rem x 6rem) */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center">
                    {children}
                </div>

                {/* Right Side */}
                <div className="flex flex-1 flex-col justify-center">
                    {/* Name */}
                    <div className="mb-3 flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${colors[colorId]}`} />
                        <span className="text-base font-semibold text-white">
                            {name}
                        </span>
                    </div>

                    {/* Timer */}
                    <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-600">
                            <div
                                className="h-full rounded-full bg-emerald-400 transition-all duration-1000"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>

                        <span className="w-10 text-right text-sm font-semibold text-slate-200">
                            {time}s
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}