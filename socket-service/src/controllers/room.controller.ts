import type { Socket } from "socket.io";
import type { SocketData } from "../middlewares/connection.middleware.js";
import redisFun from "../db/redis/fun.redis.js";
import redisKey from "../db/redis/key.redis.js";
import { emitToPlayerWithAck, emitToUser, emitToUserError, roomUpdate } from "./io.controller.js";
import { pawnData, RoomEvent, RoomStatus } from "../utils/room.util.js";
import { PlayerColorId, type PlayerColorName } from "../utils/dice.util.js";
import socketKey from "../utils/socket.utils.js";
import dealerCreate from "./dealer.controller.js";
import { getPlayerPawnState } from "./game.controller.js";

export interface PawnFourState {
    one: string,
    two: string,
    three: string,
    four: string
}

export interface PossiblePawnMoves {
    one?: string,
    two?: string,
    three?: string,
    four?: string,
    [pawnData.noMoveKey]?: string
}

export interface PlayerData {
    id: string,
    playerName: string,
    socketId: string,
    colorId: PlayerColorId,
    isOnline: boolean
    pawn: PawnFourState
    currentPossiblePawnMove?: PossiblePawnMoves
    currentDiceRoleValue?: number
    diceRollHistory: number[]
    rank: number,
}

export interface RoomData {
    id: string,
    status: RoomStatus,
    event: RoomEvent
    players: PlayerData[],
    ownerId: string,
    numberOfPlayer: number,
    currentTurn?: string,
    dealerSocketId?: string
}


async function transformRoomData(roomKey: string): Promise<void> {
    let room = await redisFun.get(roomKey);
    if (room == null) {
        throw new Error("Room not found");
    }

    const roomV1 = JSON.parse(room);

    if (roomV1 && roomV1.isNew) {
        const roomData: RoomData = {
            id: roomV1.id,
            status: RoomStatus.pending,
            event: RoomEvent.pending,
            players: [],
            ownerId: roomV1.ownerId,
            numberOfPlayer: roomV1.numberOfPlayer
        }
        await redisFun.set(roomKey, JSON.stringify(roomData));
    }

}

export const joinRoom = async (socket: Socket) => {
    const socketData: SocketData = socket.data;
    const roomKey: string = redisKey.getRoomKey(socketData.roomId);
    try {
        await transformRoomData(roomKey);
        let room = await redisFun.get(roomKey);
        if (room == null) {
            throw new Error("Room not found");
        }

        const roomData: RoomData = JSON.parse(room);

        if (roomData.status == RoomStatus.completed) {
            throw new Error("Room game already completed");
        }
        else if (roomData.status === RoomStatus.live) {
            const player = roomData.players.find((item) => item.id === socketData.playerId);
            if (!player) {
                throw new Error("Room game already started");
            }
            await sendGameStateToPlayer(socketData);
            player.socketId = socket.id;
            player.isOnline = true;
            if (roomData.dealerSocketId) {
                checkDealerIsActive(socketData.roomId, roomData.dealerSocketId);
            }
        } else {
            if (roomData.players.length === roomData.numberOfPlayer) {
                throw new Error("Room is full");
            }
            if (roomData.players.find((player) => player.colorId === socketData.colorId)) {
                throw new Error("Color is already taken");
            }
            const player: PlayerData = {
                id: socketData.playerId,
                playerName: socketData.playerName,
                socketId: socketData.id,
                colorId: socketData.colorId,
                isOnline: true,
                pawn: {
                    one: pawnData.home,
                    two: pawnData.home,
                    three: pawnData.home,
                    four: pawnData.home
                },
                diceRollHistory: [],
                rank: 0
            }
            emitToUser(socketData.roomId, socketKey.emit.roomPlayerJoin, false, "player join", socketData.playerId);
            roomData.players.push(player);
        }
        socket.join(socketData.roomId);
        await redisFun.set(roomKey, JSON.stringify(roomData));
        await roomUpdate(socketData.roomId);
        // await gotoLive(socketData.roomId);
    } catch (err: any) {
        console.log(err)
        emitToUserError(socketData.id, err.message)
    }

}

export const handleRoomExit = async (socket: Socket) => {
    const socketData: SocketData = socket.data;
    try {
        const roomKey: string = redisKey.getRoomKey(socketData.roomId);
        let room = await redisFun.get(roomKey);
        if (room === null) {
            return;
        }

        const roomData: RoomData = JSON.parse(room);

        const playerIndex = roomData.players.findIndex((item) => item.id === socketData.playerId);
        if (playerIndex === -1) return;

        if (roomData.status === RoomStatus.pending) {
            roomData.players.splice(playerIndex, 1);
            roomUpdate(socketData.roomId)
        } else if (roomData.status === RoomStatus.live) {
            roomData.players[playerIndex]!.isOnline = false;
        }

        await redisFun.set(roomKey, JSON.stringify(roomData));

        emitToUser(socketData.roomId, socketKey.emit.roomPlayerOffline, false, "player disconnect", socketData.playerId)
        roomUpdate(socketData.roomId);
    } catch (error: any) {
        console.log(error)
        emitToUserError(socketData.id, error.message)
    }

}

async function checkDealerIsActive(roomId: string, dealerSocketId: string) {
    emitToPlayerWithAck(dealerSocketId, socketKey.emit.dealerStatus, (err: any, res: any) => {
        if (err || res.length === 0) {
            dealerCreate(roomId);
        }
    });
}

async function sendGameStateToPlayer(socketData: SocketData) {
    const roomKey: string = redisKey.getRoomKey(socketData.roomId);
    try {
        let room = await redisFun.get(roomKey);
        if (room == null) {
            throw new Error("Room not found");
        }
        const roomData: RoomData = JSON.parse(room);
        emitToUser(socketData.roomId, socketKey.emit.roomPlayerOnline, false, "player online", socketData.playerId);

        if (roomData.status === RoomStatus.live) {
            const pawnState = await getPlayerPawnState(socketData.roomId);
            emitToUser(socketData.id, socketKey.emit.playerCurrentPawnState, false, "player pawn state", pawnState);
        }

        if (roomData.event === RoomEvent.diceRoll && roomData.currentTurn === socketData.playerId) {
            const playerData: PlayerData | undefined = roomData.players.find((item) => item.id === roomData.currentTurn);
            if (!playerData) return;
            if (!playerData.currentPossiblePawnMove) return;
            emitToUser(socketData.id, socketKey.emit.playerPossiblePawnMove, false, "player possible pawn move", {
                playerId: socketData.playerId,
                colorId: playerData.colorId,
                diceRollValue: playerData.currentDiceRoleValue,
                possiblePawnMoves: playerData.currentPossiblePawnMove
            });
        }
    } catch (err: any) {
        console.log(err)
        emitToUserError(socketData.id, err.message)
    }
}
