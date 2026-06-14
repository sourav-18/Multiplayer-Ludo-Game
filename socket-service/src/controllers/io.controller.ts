import type { Socket } from "socket.io";
import { io } from "../app.js";
import socketKey from "../utils/socket.utils.js";
import { handleRoomExit } from "./room.controller.js";


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
