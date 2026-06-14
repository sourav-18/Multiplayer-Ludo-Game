import type { Socket } from "socket.io";
import type { SocketData } from "../middlewares/connection.middleware.js";
import redisFun from "../db/redis/fun.redis.js";
import redisKey from "../db/redis/key.redis.js";
import { emitToUser, emitToUserError } from "./io.controller.js";
import roomUtil from "../utils/room.util.js";
import { PlayerColorId, type PlayerColorName } from "../utils/dice.util.js";

interface PlayerData {
    id: string,
    playerName: string,
    socketId: string,
    colorId: PlayerColorId
}

interface RoomData {
    status: string,
    players: PlayerData[],
    ownerId: string
    remainingIds: PlayerColorId[],
    numberOfPlayer: number
}

async function transformRoomData(roomKey: string): Promise<void> {
    let room = await redisFun.get(roomKey);
    if (room == null) {
        throw new Error("Room not found");
    }

    const roomV1 = JSON.parse(room);

    if (roomV1 && roomV1.isNew) {
        const roomData: RoomData = {
            status: roomUtil.status.pending,
            players: [],
            ownerId: roomV1.ownerId,
            remainingIds: [PlayerColorId.Green, PlayerColorId.Yellow, PlayerColorId.Blue].sort(),
            numberOfPlayer: roomV1.ownerId
        }
        await redisFun.set(roomKey, JSON.stringify(roomData));
    }

}

export const joinRoom = async (socket: Socket) => {
    const socketData: SocketData = socket.data;
    const roomKey: string = redisKey.getRoomKey(socketData.roomId);
    try {
        await transformRoomData(roomKey);
        let room = await redisFun.get(roomKey);
        if (room == null) {
            throw new Error("Room not found");
        }

        const roomData: RoomData = JSON.parse(room);

        if (roomData.status == roomUtil.status.completed) {
            throw new Error("Room game already completed");
        }
        else if (roomData.status === roomUtil.status.live) {
            const player = roomData.players.find((item) => item.id == socketData.playerId);
            if (!player) {
                throw new Error("Room game already started");
            }
            player.socketId = socket.id;
        } else {
            if (roomData.players.length === roomData.numberOfPlayer) {
                throw new Error("Room is full");
            }

            const player: PlayerData = {
                id: socketData.playerId,
                playerName: socketData.playerName,
                socketId: socketData.id,
                colorId: roomData.ownerId === socketData.playerId ? PlayerColorId.Red : roomData.remainingIds.shift()!
            }

            roomData.players.push(player);
        }

        await redisFun.set(roomKey, JSON.stringify(roomData));

    } catch (err: any) {
        emitToUserError(socketData.id, err.message)
    }

}