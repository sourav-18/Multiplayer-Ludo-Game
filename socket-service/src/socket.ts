import type { Socket } from "socket.io";
import { joinRoom } from "./controllers/room.controller.js";

export default async function socketFun(socket: Socket) {
    socket.on("ping", () => {
        socket.emit("pong", "pong");
    })

    joinRoom(socket);
}