import type { Socket } from "socket.io";
import { joinRoom } from "./controllers/room.controller.js";
import { handleDisconnect } from "./controllers/io.controller.js";

export default async function socketFun(socket: Socket) {
    socket.on("ping", () => {
        socket.emit("pong", "pong");
    })

    socket.on("disconnect", () => {
        handleDisconnect(socket);
    })

    joinRoom(socket);
}