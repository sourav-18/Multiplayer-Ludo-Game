// PlayerCard.jsx

import { useEffect, useState } from "react";
import { AllState } from "../../context/Context";

export default function PlayerCard({
    color,
    classNames
}) {
    const { state: { roomData, playerId,playerTimerDetails } } = AllState();
    const [time, setTime] = useState(30);
    const [playerData, setPlayerData] = useState(null)
    const colors = {
        red: {
            id: 1,
            color: "bg-red-500"
        },
        green: {
            id: 2,
            color: "bg-green-500"
        },
        yellow: {
            id: 3,
            color: "bg-yellow-400"
        },
        blue: {
            id: 4,
            color: "bg-blue-500"
        },
    };

    useEffect(() => {
        if (roomData && Array.isArray(roomData.players) && roomData.players.length) {
            const currentColorCode = colors[color].id;
            const player = roomData.players.find((item) => item.colorId == currentColorCode)
            if (player) {
                setPlayerData(player)
                // console.log(player.isOnline)
            }

        }
    }, [roomData])

    useEffect(() => {
        if (playerTimerDetails && playerTimerDetails.playerId === playerData?.id) {
            setTime(playerTimerDetails.time);
        }
    }, [playerTimerDetails])


    return (
        (playerData && playerData.id !== playerId) && <div
            className={`w-full border px-3 py-2 absolute ${classNames} ${playerData?.isOnline
                ? "border-slate-700 bg-slate-800"
                : "border-slate-300 bg-slate-50 opacity-70"
                }`}
        >
            <div className="flex items-center gap-3">
                {/* Player Color + Name */}
                <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${colors[color].color}`} />

                    <span
                        className={`text-sm font-semibold ${playerData?.isOnline ? "text-white" : "text-slate-600"
                            }`}
                    >
                        {playerData?.playerName ? playerData.playerName.length > 12 ? playerData.playerName.slice(0, 9) + '...' : playerData.playerName : 'guest'}
                    </span>
                </div>

                {/* Timer */}
                <div className="ml-auto flex w-28 items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-600">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${time <= 10 ? "bg-red-500" : "bg-emerald-400"
                                }`}
                            style={{ width: `${(time / 30) * 100}%` }}
                        />
                    </div>

                    <span
                        className={`w-10 text-right text-sm font-semibold ${time <= 10 ? "text-red-400" : "text-slate-200"
                            }`}
                    >
                        {time}s
                    </span>
                </div>
            </div>
        </div>
    );
}