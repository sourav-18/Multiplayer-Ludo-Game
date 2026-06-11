import type { Socket } from "socket.io";

export default function socketFun(socket:Socket) {
    socket.on("ping", () => {
        socket.emit("pong", "pong");
    })
}