import type { Socket } from "socket.io";
import { joinRoom } from "./controllers/room.controller.js";
import { handleDisconnect } from "./controllers/io.controller.js";
import socketKey from "./utils/socket.utils.js";
import { gameStart, turnChange } from "./controllers/game.controller.js";

export default async function socketFun(socket: Socket) {
    console.log("socket connect: ", socket.id)
    socket.on("ping", () => {
        socket.emit("pong", "pong");
    })

    socket.on("disconnect", () => {
        handleDisconnect(socket);
    })

    if (!socket.data.dealer) {
        joinRoom(socket);
    }

    //dealer 

    socket.on(socketKey.on.dealerRoomStart, (roomId: string) => {
        gameStart(roomId);
    })

    socket.on(socketKey.on.dealerTurnChange, (roomId: string) => {
        turnChange(roomId);
    })
}