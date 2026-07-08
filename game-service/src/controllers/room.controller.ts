import { json, type Request, type Response } from "express";
import { createRoomInDb, isAlreadyUserInGame } from "../db/postgres/room.db.js";
import redisFun from "../db/redis/fun.redis.js";
import redisKey from "../db/redis/key.redis.js";


export const createRoom = async (req: Request, res: Response) => {
    //todo validate all input details
    const numberOfPlayer = req.body.numberOfPlayer;
    const userId = req.headers['user-id'] as string;
    const isUserInGame = await isAlreadyUserInGame(userId);

    // if (isUserInGame) {
    //     return res.json({
    //         status: "error",
    //         message: "you are already in game"
    //     })
    // }
    const dbRes = await createRoomInDb(numberOfPlayer, userId);
    if (dbRes.error) {
        return res.json({
            status: "error",
            message: dbRes.message
        })
    }
    const roomId = dbRes.data;
    const roomData = { id: roomId, numberOfPlayer: numberOfPlayer, ownerId: userId, "isNew": true }
    await redisFun.set(redisKey.getRoomKey(dbRes.data), JSON.stringify(roomData));

    return res.json({
        status: "success",
        message: dbRes.message,
        data: dbRes.data
    })
}

export const getRejoinRoomData = async (req: Request, res: Response) => {
    const roomId = req.params.roomId as string;
    const userId = req.headers['user-id'] as string;
    const roomKey = redisKey.getRoomKey(roomId);

    let roomData: any = await redisFun.get(roomKey);
    if (!roomData) {
        return res.json({
            status: "error",
            message: "room not found"
        })
    }

    roomData = JSON.parse(roomData);

    if (roomData.status !== 'live') {
        return res.json({
            status: "error",
            message: "room is't live"
        })
    }

    const playerData = roomData.players.find((player: any) => player.id == userId);

    if (!playerData) {
        return res.json({
            status: "error",
            message: "player not in room"
        })
    }

    return res.json({
        status: "success",
        message: "Re Join data fetch successfully",
        data: {
            colorId: playerData.colorId,
            name: playerData.playerName
        }
    })


}