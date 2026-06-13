import { io } from "../app.js";
import socketKey from "../utils/socket.utils.js";

export const disconnectBySocketId = (socketId: string) => {
    const socketObj = io.sockets.sockets.get(socketId);
    if (socketObj) {
        socketObj.disconnect()
    }
    return;
}

export const emitToUser = <T>(socketId: string, event: string, error: boolean, message: string, data: T) => {
    io.to(socketId).emit(event, JSON.stringify({
        error: error,
        message: message,
        data: data
    }))
}

export const emitToUserError = (socketId: string, message: string = "error") => {
    emitToUser(socketId, socketKey.emit.error, true, message, null);
}
