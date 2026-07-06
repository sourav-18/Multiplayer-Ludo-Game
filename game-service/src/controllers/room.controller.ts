import { json, type Request, type Response } from "express";
import { createRoomInDb, isAlreadyUserInGame } from "../db/postgres/room.db.js";
import redisFun from "../db/redis/fun.redis.js";
import redisKey from "../db/redis/key.redis.js";


export const createRoom = async (req: Request, res: Response) => {
    //todo validate all input details
    const numberOfPlayer = req.body.numberOfPlayer;
    const userId = req.body.userId;
    const isUserInGame = await isAlreadyUserInGame(userId);

    if (isUserInGame) {
        return res.json({
            status: "error",
            message: "you are already in game"
        })
    }
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