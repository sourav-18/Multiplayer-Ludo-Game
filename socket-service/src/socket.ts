import { Socket } from "socket.io";
import { joinRoom } from "./controllers/room.controller.js";
import { handleDisconnect } from "./controllers/io.controller.js";
import socketKey from "./utils/socket.utils.js";
import { diceRoll, gameStart, pawnMove, sendTimer, turnChange, turnSet } from "./controllers/game.controller.js";

export default async function socketFun(socket: Socket) {
    console.log("socket connect: ", socket.id)
    socket.on("ping", () => {
        socket.emit("pong", "pong");
    })

    socket.on("disconnect", () => {
        console.log("disconnect: ", socket.id)
        handleDisconnect(socket);
    })

    if (!socket.data.dealer) {
        joinRoom(socket);
    }

    //dealer 

    socket.on(socketKey.on.dealerTurnSetReq, (data: any) => {
        turnSet(data.roomId, false, data.isTimeExpire ?? false);
    })

    socket.on(socketKey.on.dealerTurnChange, (roomId: string) => {
        turnChange(roomId);
    })

    socket.on(socketKey.on.dealerPlayerActionTimer, (data: any) => {
        sendTimer(data);
    })

    //player

    socket.on("ping", () => {
        socket.emit("pong", true)
    })

    socket.on(socketKey.on.roomStart, () => {
        gameStart(socket);
    });

    socket.on(socketKey.on.pawnMove, (data, callback) => {
        pawnMove(socket, data, callback);
    });

    socket.on(socketKey.on.playerDiceRoll, (callback) => {
        diceRoll(socket, callback);
    })
}