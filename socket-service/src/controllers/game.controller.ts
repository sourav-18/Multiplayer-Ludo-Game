import redisFun from "../db/redis/fun.redis.js";
import redisKey from "../db/redis/key.redis.js";
import { getPossiblePawnMove, getShuffleDiceValue } from "../utils/dice.util.js";
import { RoomEvent } from "../utils/room.util.js";
import socketKey from "../utils/socket.utils.js";
import { emitToDealer, emitToUser } from "./io.controller.js";
import type { PlayerData, RoomData } from "./room.controller.js";

export const gameStart = async (roomId: string) => {
    const roomKey: string = redisKey.getRoomKey(roomId);
    let room = await redisFun.get(roomKey);
    if (room == null) {
        throw new Error("Room not found");
    }
    const roomData: RoomData = JSON.parse(room);
    // const player: PlayerData | undefined = roomData.players.find((item) => item.id === roomData.currentTurn);
    // if (!player) {
    //     throw new Error("Player not found");
    // }

    roomData.event = RoomEvent.start;
    emitToUser(roomId, socketKey.emit.roomEventUpdate, false, "game started", {
        event: RoomEvent.start
    })
    await redisFun.set(roomKey, JSON.stringify(roomData));

}


export const turnSet = async (roomId: string) => {
    const roomKey: string = redisKey.getRoomKey(roomId);
    let room = await redisFun.get(roomKey);
    if (room == null) {
        throw new Error("Room not found");
    }
    const roomData: RoomData = JSON.parse(room);
    roomData.event = RoomEvent.turnSet;

    emitToDealer(roomData.dealerSocketId!, socketKey.emit.dealerTurnSet, roomId)

}

export const turnChange = async (roomId: string) => {
    const roomKey: string = redisKey.getRoomKey(roomId);
    let room = await redisFun.get(roomKey);
    if (room == null) {
        throw new Error("Room not found");
    }
    const roomData: RoomData = JSON.parse(room);
    if (roomData.event != RoomEvent.turnSet) {
        throw new Error("invalid turn change ")
    }
    roomData.event = RoomEvent.turnChange;
    await redisFun.set(roomKey, JSON.stringify(roomData));
    await sendPossiblePath(roomId);

    emitToUser(roomId, socketKey.emit.roomEventUpdate, false, "turn change", {
        event: RoomEvent.start
    })

}

export const sendPossiblePath = async (roomId: string) => {
    const roomKey: string = redisKey.getRoomKey(roomId);
    let room = await redisFun.get(roomKey);
    if (room == null) {
        throw new Error("Room not found");
    }
    const roomData: RoomData = JSON.parse(room);

    if (roomData.event != RoomEvent.turnChange) {
        throw new Error("invalid sendPossiblePath ");
    }

    //diceRollValue
    const playerIndex = roomData.players.findIndex((item) => item.id == roomData.currentTurn);
    if (playerIndex == -1) {
        throw new Error("Player not found");
        return;
    }
    const player: PlayerData = roomData.players[playerIndex]!;
    const diceRollValue: number = getShuffleDiceValue();

    player.diceRollHistory.push(diceRollValue);

    //possible path 
    let possiblePawnMoves = getPossiblePawnMove(
        player.colorId,
        player.pawn,
        diceRollValue
    )


    emitToUser(player.socketId, socketKey.emit.playerPossiblePawnMove, false,
        "player possible pawn move",
        {
            diceRollValue: diceRollValue,
            possiblePawnMoves: possiblePawnMoves
        })

    player.currentPossiblePawnMove = possiblePawnMoves;

    roomData.players[playerIndex] = player;
    roomData.event = RoomEvent.sendPossiblePath;
    await redisFun.set(roomKey, JSON.stringify(roomData));
    return;


}