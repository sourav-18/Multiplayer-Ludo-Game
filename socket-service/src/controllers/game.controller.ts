import type { Socket } from "socket.io";
import redisFun from "../db/redis/fun.redis.js";
import redisKey from "../db/redis/key.redis.js";
import { getPossiblePawnMove, getShuffleDiceValue, isSafeState } from "../utils/dice.util.js";
import { pawnData, RoomEvent, RoomStatus } from "../utils/room.util.js";
import socketKey from "../utils/socket.utils.js";
import dealerCreate from "./dealer.controller.js";
import { emitToDealer, emitToUser, emitToUserError, roomUpdate } from "./io.controller.js";
import type { PawnFourState, PlayerData, RoomData } from "./room.controller.js";
import type { SocketData } from "../middlewares/connection.middleware.js";

interface PawnMoveData {
    pawn: keyof PawnFourState,
    state: string
}

export const gameStart = async (socket: Socket) => {
    const socketData: SocketData = socket.data;
    const playerId = socketData.playerId;
    const roomId = socketData.roomId;
    try {
        const roomKey: string = redisKey.getRoomKey(roomId);
        let room = await redisFun.get(roomKey);
        if (room == null) {
            throw new Error("Room not found");
        }
        const roomData: RoomData = JSON.parse(room);
        if (roomData.status !== RoomStatus.pending) {
            throw new Error("Room already start");
        }
        if (roomData.ownerId !== playerId) {
            throw new Error("Room owner only start the game");
        }
        if (roomData.players.length === 1) {
            throw new Error("You can't start room has only one player just you");
        }

        roomData.event = RoomEvent.start;
        roomData.status = RoomStatus.live;
        emitToUser(roomId, socketKey.emit.roomEventUpdate, false, "game started", {
            event: RoomEvent.start
        })
        const players = roomData.players.map((item) => {
            return {
                id: item.id,
                colorId: item.colorId
            }
        })

        players.sort((a, b) => a.colorId - b.colorId);
        roomData.currentTurn = players[0]?.id!;
        await redisFun.set(roomKey, JSON.stringify(roomData));
        dealerCreate(roomId)
    } catch (err: any) {
        console.log(err)
        emitToUserError(socketData.id, err.message)
    }
}


export const turnSet = async (roomId: string, isAgainSamePlayer: boolean = false, isTimeExpire: boolean = false) => {
    const roomKey: string = redisKey.getRoomKey(roomId);
    try {
        let room = await redisFun.get(roomKey);
        if (room == null) {
            throw new Error("Room not found");
        }
        const roomData: RoomData = JSON.parse(room);

        if (roomData.event === RoomEvent.start) {
            //do nothing
        } else if (isAgainSamePlayer === true) {
        }
        else if (roomData.event === RoomEvent.pawnMove || isTimeExpire) {
            const currentPlayer: PlayerData | undefined = roomData.players.find((item) => item.id === roomData.currentTurn);
            if (!currentPlayer) {
                throw new Error("player not found");
            }
            const players = roomData.players.map((item) => {
                return {
                    id: item.id,
                    colorId: item.colorId
                }
            })

            players.sort((a, b) => a.colorId - b.colorId);
            const currentPlayerIndexInPlayers = players.findIndex((player) => player.id === currentPlayer.id);
            const nextPlayerIndex = currentPlayerIndexInPlayers < players.length - 1 ? currentPlayerIndexInPlayers + 1 : 0;
            const nextPlayerId = players[nextPlayerIndex]?.id;
            roomData.currentTurn = nextPlayerId!;

            // let currentPlayerIndex = -1;
            // let oppositionPlayerIndex = -1;
            // roomData.players.forEach((item, index) => {
            //     if (item.id == roomData.currentTurn) {
            //         currentPlayerIndex = index;
            //     } else {
            //         oppositionPlayerIndex = index;
            //     }
            // });

            // if (currentPlayerIndex === -1 || oppositionPlayerIndex === -1) {
            //     await redisFun.releaseLock(roomKey); //release
            //     return;
            // }
            // const currentPlayer = roomData.players[currentPlayerIndex];
            // if (!currentPlayer.pawnMoveHistory[currentPlayer.pawnMoveHistory.length - 1]?.again) {
            //     roomData.currentTurn = roomData.players[oppositionPlayerIndex].id;
            // }
        }
        else {
            throw new Error("invalid turn set");
        }
        roomData.event = RoomEvent.turnSet;
        await redisFun.set(roomKey, JSON.stringify(roomData));
        emitToDealer(roomData.dealerSocketId!, socketKey.emit.dealerTurnSetDone, roomId)
    } catch (err: any) {
        console.log(err)
        emitToUserError(roomId, err.message)
    }

}

export const turnChange = async (roomId: string) => {
    const roomKey: string = redisKey.getRoomKey(roomId);

    try {
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
        emitToUser(roomId, socketKey.emit.roomEventUpdate, false, "turn change", {
            event: roomData.event,
            playerId: roomData.currentTurn
        })
        emitToDealer(roomData.dealerSocketId!, socketKey.emit.dealerTurnChangeDone, { roomId: roomId, playerId: roomData.currentTurn })
    } catch (err: any) {
        console.log(err)
        emitToUserError(roomId, err.message)
    }

    // await sendPossiblePath(roomId);
}

export const diceRoll = async (socket: Socket, callback: any) => {
    const socketData: SocketData = socket.data;
    const roomId: string = socketData.roomId;
    const roomKey: string = redisKey.getRoomKey(roomId);
    try {
        let room = await redisFun.get(roomKey);
        if (room == null) {
            throw new Error("Room not found");
        }
        const roomData: RoomData = JSON.parse(room);

        if (roomData.event != RoomEvent.turnChange) {
            throw new Error("invalid diceRoll ");
        }

        if (socketData.playerId !== roomData.currentTurn) {
            throw new Error("It's not you turn");
        }

        //diceRollValue
        const playerIndex = roomData.players.findIndex((item) => item.id == roomData.currentTurn);
        if (playerIndex == -1) {
            throw new Error("player not found");
        }
        const player: PlayerData = roomData.players[playerIndex]!;
        // const diceRollValue: number = getShuffleDiceValue(player.diceRollHistory);
        const diceRollValue: number = 1;

        player.diceRollHistory.push(diceRollValue);

        //possible path 
        let possiblePawnMoves = getPossiblePawnMove(
            player.colorId,
            player.pawn,
            diceRollValue
        )


        player.currentPossiblePawnMove = possiblePawnMoves;
        player.currentDiceRoleValue = diceRollValue;

        roomData.players[playerIndex] = player;
        roomData.event = RoomEvent.diceRoll;
        await redisFun.set(roomKey, JSON.stringify(roomData));
        emitToUser(roomId, socketKey.emit.roomEventUpdate, false, "diceRoll", {
            event: roomData.event
        })
        callback(
            {
                error: false,
                data: {
                    playerId: player.id,
                    colorId: player.colorId,
                    diceRollValue: diceRollValue,
                    possiblePawnMoves: possiblePawnMoves
                }
            })

        // if (possiblePawnMoves.noPawn) {
        //     turnSet(roomId, false, true);
        //     return;
        // }

        emitToUser(roomId, socketKey.emit.roomPlayerDiceRoll, false, "room player dice roll", {
            playerId: player.id,
            colorId: player.colorId,
            diceRollValue: diceRollValue,
            possiblePawnMoves: possiblePawnMoves
        })
        return;
    } catch (err: any) {
        console.log(err)
        emitToUserError(socketData.id, err.message)
    }


}

export const pawnMove = async (socket: Socket, moveData: PawnMoveData, callback: any) => {
    //todo validate moveData
    const socketData: SocketData = socket.data;
    const roomId: string = socketData.roomId;
    const playerId: string = socketData.playerId;
    const roomKey: string = redisKey.getRoomKey(roomId);
    try {
        let room = await redisFun.get(roomKey);
        if (room == null) {
            throw new Error("Room not found");
        }

        const roomData: RoomData = JSON.parse(room);



        if (roomData.event != RoomEvent.diceRoll) {
            throw new Error("invalid pawnMove");
        }

        if (roomData.currentTurn != playerId) {
            throw new Error("invalid player turn");
        }

        const currentPlayer: PlayerData | undefined = roomData.players.find((item) => item.id == playerId);
        if (!currentPlayer) {
            throw new Error("player not found");
        }

        let isValidMove = false;
        let isAgainPawnMove = false;
        const possibleMoveState = currentPlayer.currentPossiblePawnMove;

        if (possibleMoveState && possibleMoveState[moveData.pawn] == moveData.state) {
            if (moveData.state != pawnData.noMoveValue) {
                currentPlayer.pawn[moveData.pawn] = moveData.state;
            }
            isValidMove = true;
        }

        if (isValidMove === false) {
            throw new Error("pawn move is not valid");
        }

        callback({ success: true }) // todo callBack check if need to previous 

        if (currentPlayer.diceRollHistory[currentPlayer.diceRollHistory.length - 1] == 6) {
            isAgainPawnMove = true;
        }

        //two player pawn at same position
        // if (moveData.state != gameUtils.key.pawn.noMoveValue) {
        let goHomeData = null;

        if (isSafeState(moveData.state) === false) {
            const opponentNonSafePlayer: PlayerData | undefined = roomData.players.find((player) => {
                if (player.id === currentPlayer.id) return false;
                return Object.values(player.pawn).find((state) => state === moveData.state);
            });

            if (opponentNonSafePlayer) { //todo here all pawn should be check
                isAgainPawnMove = true;
                const pawnHomeData = [];
                for (let [p, state] of Object.entries(opponentNonSafePlayer.pawn)) {
                    if (state === moveData.state) {
                        opponentNonSafePlayer.pawn[p as keyof PawnFourState] = pawnData.home;
                        //todo also update in pawnMove history
                        pawnHomeData.push({ pawn: p, state: pawnData.home });
                    }
                }
                goHomeData = {
                    playerId: opponentNonSafePlayer.id,
                    colorId: opponentNonSafePlayer.colorId,
                    pawnHomeData
                }

            }
        }

        emitToUser(roomId, socketKey.emit.roomPlayerPawnMove, false, "pawn move",
            {
                playerId: playerId,
                colorId: currentPlayer.colorId,
                diceRollValue: currentPlayer.currentDiceRoleValue,
                pawn: moveData.pawn,
                state: moveData.state,
                goHomeData: goHomeData
            }
        )

        let isGameComplete = false;
        if (moveData.state.includes(pawnData.completed)) {
            isAgainPawnMove = true;
            let completedPawn = Object.values(currentPlayer.pawn).filter(item => item.includes(pawnData.completed)).length;
            if (completedPawn === 4) { //complete game
                const players = roomData.players.map((item) => {
                    return {
                        id: item.id,
                        rank: item.rank
                    }
                })

                players.sort((a, b) => b.rank - a.rank);
                const lastRank = (players[0]?.rank ?? 0);
                currentPlayer.rank = lastRank + 1;
                emitToUser(roomId, socketKey.emit.roomPlayerRank, false, "player rank",
                    {
                        playerId: playerId,
                        colorId: currentPlayer.colorId,
                        rank: currentPlayer.rank
                    }
                )
                if (lastRank + 1 === roomData.players.length - 1) {
                    isGameComplete = true;
                }
            }
        }


        roomData.event = RoomEvent.pawnMove;
        await redisFun.set(roomKey, JSON.stringify(roomData));

        if (isGameComplete) {
            complete(roomId);
        } else {
            turnSet(roomId, isAgainPawnMove);
        }
        return;
    } catch (err: any) {
        console.log(err)
        emitToUserError(socketData.id, err.message)
    }
}

export const getPlayerPawnState = async (roomId: string) => {
    const roomKey: string = redisKey.getRoomKey(roomId);
    let room = await redisFun.get(roomKey);
    if (room == null) {
        throw new Error("Room not found");
    }

    const roomData: RoomData = JSON.parse(room);

    const pawnState = roomData.players.map((player) => {
        return {
            id: player.id,
            pawn: player.pawn,
            colorId: player.colorId
        }
    })
    return pawnState;
}

export const sendTimer = async (data: any) => {
    emitToUser(data.roomId, socketKey.emit.roomPlayerActionTimer, false, "Timer", data);
}

async function complete(roomId: string) {
    const roomKey: string = redisKey.getRoomKey(roomId);
    try {
        let room = await redisFun.get(roomKey);
        if (room == null) {
            throw new Error("Room not found");
        }

        const roomData: RoomData = JSON.parse(room);
        roomData.status = RoomStatus.completed;
        roomData.event = RoomEvent.completed;

        const nonRankPlayer = roomData.players.find((player) => player.rank === 0);
        if (!nonRankPlayer) return;
        nonRankPlayer.rank = roomData.players.length;
        emitToUser(roomId, socketKey.emit.roomPlayerRank, false, "player rank",
            {
                playerId: nonRankPlayer.id,
                colorId: nonRankPlayer.colorId,
                rank: nonRankPlayer.rank
            }
        )

        emitToUser(roomId, socketKey.emit.roomEventUpdate, false, "game completed", {
            event: RoomEvent.completed
        })

        await redisFun.set(roomKey, JSON.stringify(roomData));
        emitToDealer(roomData.dealerSocketId!, socketKey.emit.dealerDisconnect, null);
    } catch (err: any) {
        console.log(err)
        emitToUserError(roomId, err.message)
    }


}