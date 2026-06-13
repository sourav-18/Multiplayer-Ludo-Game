import type { Socket } from "socket.io";
import type { SocketData } from "../middlewares/connection.middleware.js";
import redisFun from "../db/redis/fun.redis.js";
import redisKey from "../db/redis/key.redis.js";
import { emitToUser, emitToUserError } from "./io.controller.js";
import roomUtil from "../utils/room.util.js";


export const joinRoom = async (socket: Socket) => {
    const socketData: SocketData = socket.data;
    try {
        let roomData = await redisFun.get(redisKey.getRoomKey(socketData.roomId));
        if (roomData == null) {
            throw new Error("Room not found");
        }
        roomData=JSON.parse(roomData);
        if(roomData.status==roomUtil.status.completed){
            throw new Error("Room game already completed");
        }
        
    } catch (err: any) {
        emitToUserError(socketData.id, err.message)
    }

}