import type { Socket } from "socket.io";
import type { SocketData } from "../middlewares/connection.middleware.js";
import redisFun from "../db/redis/fun.redis.js";
import redisKey from "../db/redis/key.redis.js";
import { emitToPlayerWithAck, emitToUser, emitToUserError, roomUpdate } from "./io.controller.js";
import { RoomEvent, RoomStatus } from "../utils/room.util.js";
import { PlayerColorId, type PlayerColorName } from "../utils/dice.util.js";
import socketKey from "../utils/socket.utils.js";
import dealerCreate from "./dealer.controller.js";

export interface PlayerData {
    id: string,
    playerName: string,
    socketId: string,
    colorId: PlayerColorId,
    isOnline: boolean
    diceRollHistory:number[]
}

export interface RoomData {
    id: string,
    status: RoomStatus,
    event: RoomEvent
    players: PlayerData[],
    ownerId: string,
    remainingIds: PlayerColorId[],
    numberOfPlayer: number,
    currentTurn: string,
    dealerSocketId?: string
}


async function transformRoomData(roomKey: string): Promise<void> {
    let room = await redisFun.get(roomKey);
    if (room == null) {
        throw new Error("Room not found");
    }

    const roomV1 = JSON.parse(room);

    if (roomV1 && roomV1.isNew) {
        const roomData: RoomData = {
            id: roomV1.id,
            status: RoomStatus.pending,
            event: RoomEvent.pending,
            players: [],
            ownerId: roomV1.ownerId,
            currentTurn:roomV1.ownerId,
            remainingIds: [PlayerColorId.Green, PlayerColorId.Yellow, PlayerColorId.Blue],
            numberOfPlayer: roomV1.numberOfPlayer
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

        if (roomData.status == RoomStatus.completed) {
            throw new Error("Room game already completed");
        }
        else if (roomData.status === RoomStatus.live) {
            const player = roomData.players.find((item) => item.id === socketData.playerId);
            if (!player) {
                throw new Error("Room game already started");
            }
            emitToUser(socketData.roomId, socketKey.emit.roomPlayerOnline, false, "player online", socketData.playerId);
            player.socketId = socket.id;
            player.isOnline = true;
            if (roomData.dealerSocketId) {
                checkDealerIsActive(socketData.roomId,roomData.dealerSocketId);
            }
        } else {
            if (roomData.players.length === roomData.numberOfPlayer) {
                throw new Error("Room is full");
            }
            roomData.remainingIds.sort();
            const player: PlayerData = {
                id: socketData.playerId,
                playerName: socketData.playerName,
                socketId: socketData.id,
                colorId: roomData.ownerId === socketData.playerId ? PlayerColorId.Red : roomData.remainingIds.shift()!,
                isOnline: true,
                diceRollHistory:[]
            }
            emitToUser(socketData.roomId, socketKey.emit.roomPlayerJoin, false, "player join", socketData.playerId);
            roomData.players.push(player);
        }
        socket.join(socketData.roomId);
        await redisFun.set(roomKey, JSON.stringify(roomData));
        await roomUpdate(socketData.roomId);
        await gotoLive(socketData.roomId);
    } catch (err: any) {
        console.log(err)
        emitToUserError(socketData.id, err.message)
    }

}

export const handleRoomExit = async (socket: Socket) => {
    const socketData: SocketData = socket.data;
    try {
        const roomKey: string = redisKey.getRoomKey(socketData.roomId);
        let room = await redisFun.get(roomKey);
        if (room === null) {
            return;
        }

        const roomData: RoomData = JSON.parse(room);

        const playerIndex = roomData.players.findIndex((item) => item.id === socketData.playerId);
        if (playerIndex === -1) return;

        if (roomData.status === RoomStatus.pending) {
            const player: PlayerData = roomData.players[playerIndex]!;
            if (roomData.ownerId !== socketData.playerId) {
                roomData.remainingIds.push(player.colorId);
            }
            roomData.players.splice(playerIndex, 1);
            roomUpdate(socketData.roomId)
        } else if (roomData.status === RoomStatus.live) {
            roomData.players[playerIndex]!.isOnline = false;
        }

        await redisFun.set(roomKey, JSON.stringify(roomData));

        emitToUser(socketData.roomId, socketKey.emit.roomPlayerOffline, false, "player disconnect", socketData.playerId)
        roomUpdate(socketData.roomId);
    } catch (error: any) {
        console.log(error)
        emitToUserError(socketData.id, error.message)
    }

}

async function gotoLive(roomId: string) {
    const roomKey: string = redisKey.getRoomKey(roomId);
    let room = await redisFun.get(roomKey);
    if (room == null) {
        return; // todo global error handler is needed (and pur error here)
    }

    const roomData: RoomData = JSON.parse(room);

    if (roomData.status == RoomStatus.pending && roomData.numberOfPlayer === roomData.players.length) {
        roomData.status = RoomStatus.live;
        await redisFun.set(roomKey, JSON.stringify(roomData));
        emitToUser(roomId, socketKey.emit.roomStatusUpdate, false, "Room status update", RoomStatus.live);
        dealerCreate(roomId)
    }
}

async function checkDealerIsActive(roomId:string,dealerSocketId: string) {
    emitToPlayerWithAck(dealerSocketId, socketKey.emit.dealerStatus, (err: any, res: any) => {
        if (err || res.length === 0) {
            dealerCreate(roomId);
        }
    });
}
