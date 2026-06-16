import type { Socket } from "socket.io";
import { io } from "../app.js";
import socketKey from "../utils/socket.utils.js";
import { handleRoomExit, type RoomData } from "./room.controller.js";
import redisKey from "../db/redis/key.redis.js";
import redisFun from "../db/redis/fun.redis.js";


export const disconnectBySocketId = (socketId: string) => {
    const socketObj = io.sockets.sockets.get(socketId);
    if (socketObj) {
        socketObj.disconnect()
    }
    return;
}

export const emitToUser = <T>(socketId: string, event: string, error: boolean, message: string, data: T) => {
    // await new Promise((resolve)=>setTimeout(resolve,100))
    io.to(socketId).emit(event, {
        error: error,
        message: message,
        data: data
    })
}

export const emitToUserError = (socketId: string, message: string = "error") => {
    emitToUser(socketId, socketKey.emit.error, true, message, null);
}

export const handleDisconnect = (socket: Socket) => {
    handleRoomExit(socket);
}

export const roomUpdate = async (roomId: string): Promise<void> => {
    const roomKey: string = redisKey.getRoomKey(roomId);
    let room = await redisFun.get(roomKey);
    if (room === null) {
        return;
    }
    const roomData: RoomData = JSON.parse(room);
    emitToUser(roomId, socketKey.emit.roomUpdate, false, "room update", roomData);
}

export const emitToPlayerWithAck = async (socketId: string, event: string, callback: any) => {
    io.to(socketId).timeout(1000).emit(event, true, callback);
    return;
}