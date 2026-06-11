import { io } from "../app.js";

export const disconnectBySocketId = (socketId: string) => {
    const socketObj = io.sockets.sockets.get(socketId);
    if (socketObj) {
        socketObj.disconnect()
    }
    return;
}