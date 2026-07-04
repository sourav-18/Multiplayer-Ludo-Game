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
        await redisFun.set(roomKey, JSON.stringify(roomData));
        dealerCreate(roomId)
    } catch (err: any) {
        console.log(err)
        emitToUserError(socketData.id, err.message)
    }
}


export const turnSet = async (roomId: string, isAgainSamePlayer: boolean = false, isNoPawnMove: boolean = false) => {
    const roomKey: string = redisKey.getRoomKey(roomId);
    let room = await redisFun.get(roomKey);
    if (room == null) {
        throw new Error("Room not found");
    }
    const roomData: RoomData = JSON.parse(room);

    if (roomData.event === RoomEvent.start) {
        //do nothing
    } else if (isAgainSamePlayer === true) {
    }
    else if (roomData.event === RoomEvent.pawnMove || isNoPawnMove) {
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

        players.sort((a, b) => b.colorId - a.colorId);
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
        throw new Error("invalid turn change ");
    }
    roomData.event = RoomEvent.turnSet;
    await redisFun.set(roomKey, JSON.stringify(roomData));
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
    emitToUser(roomId, socketKey.emit.roomEventUpdate, false, "turn change", {
        event: roomData.event,
        playerId: roomData.currentTurn
    })

    // await sendPossiblePath(roomId);
}

export const diceRoll = async (socket: Socket, callback: any) => {
    const socketData: SocketData = socket.data;
    const roomId: string = socketData.roomId;
    const roomKey: string = redisKey.getRoomKey(roomId);
    let room = await redisFun.get(roomKey);
    if (room == null) {
        throw new Error("Room not found");
    }
    const roomData: RoomData = JSON.parse(room);

    if (roomData.event != RoomEvent.turnChange) {
        throw new Error("invalid diceRoll ");
    }

    //diceRollValue
    const playerIndex = roomData.players.findIndex((item) => item.id == roomData.currentTurn);
    if (playerIndex == -1) {
        throw new Error("it's not you turn");
    }
    const player: PlayerData = roomData.players[playerIndex]!;
    // const diceRollValue: number = getShuffleDiceValue();
    const diceRollValue: number = 2;

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
                diceRollValue: diceRollValue,
                colorId: player.colorId,
                possiblePawnMoves: possiblePawnMoves
            }
        })

    emitToUser(roomId, socketKey.emit.roomPlayerDiceRoll, false, "room player dice roll", {
        playerId: player.id,
        colorId: player.colorId,
        diceRollValue: diceRollValue,
        possiblePawnMoves: possiblePawnMoves
    })

    if (possiblePawnMoves.noPawn) {
        turnSet(roomId, false, true);
    }

    return;


}

export const pawnMove = async (roomId: string, playerId: string, moveData: PawnMoveData, callback: any) => {
    // const validationResult = gameValidation.pawnMove.validate(moveData);
    // if (validationResult.error) {
    //     return;
    // }


    const roomKey: string = redisKey.getRoomKey(roomId);
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
    } else if (moveData.state == pawnData.completed) {
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

    let isComplete = false;
    if (moveData.state.includes(pawnData.completed)) {
        isAgainPawnMove = true;
        let completedPawn = Object.values(currentPlayer.pawn).filter(item => item.includes(pawnData.completed)).length;
        if (completedPawn === 4) { //complete game
            isComplete = true;
        }
    }


    roomData.event = RoomEvent.pawnMove;
    // const playerPawnMoveHistory = { [moveData.pawn]: moveData.state }
    // if (isAgainPawnMove) playerPawnMoveHistory["again"] = true;
    // player.pawnMoveHistory.push(playerPawnMoveHistory);
    // roomData.players[playerIndex] = player;
    await redisFun.set(roomKey, JSON.stringify(roomData));

    emitToUser(roomId, socketKey.emit.roomPlayerPawnMove, false, "pawn move",
        {
            playerId: playerId,
            colorId: currentPlayer.colorId,
            pawn: moveData.pawn,
            state: moveData.state,
            goHomeData: goHomeData
        }
    )

    if (isComplete) {
        console.log("complete")
        // this.handleCompleted({ gameId, playerId });
    } else {
        turnSet(roomId, isAgainPawnMove);
    }
    return;
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