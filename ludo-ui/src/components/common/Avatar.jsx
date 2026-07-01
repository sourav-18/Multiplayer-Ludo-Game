import React, { useEffect, useState } from 'react'
import avatarImage from "../../assets/avatar.png";
import { AllState } from '../../context/Context';

function Avatar({ classNames, id }) {
    const { state: { roomData } } = AllState();
    const [playerData, setPlayerData] = useState(null)
    const ids = {
        "red-avatar": 1,
        "green-avatar": 2,
        "yellow-avatar": 3,
        "blue-avatar": 4,
    }

    useEffect(() => {
        if (roomData && Array.isArray(roomData.players) && roomData.players.length) {
            const currentColorCode = ids[id];
            const player = roomData.players.find((item) => item.colorId == currentColorCode)
            if (player) {
                setPlayerData(player)
            }
        }
    }, [roomData])
    return (
        <div className={`absolute w-20 ${classNames}`} >
            {/* <img src={avatarImage} id={id} className='absolute -right-25 top-3 w-20'/> */}
            <img src={avatarImage} id={id} />
            <p>{playerData?.playerName}</p>
            <p>{playerData?.isOnline ? 'online' : 'offline'}</p>
        </div>
    )
}

export default Avatar