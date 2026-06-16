import redisFun from "../db/redis/fun.redis.js";
import redisKey from "../db/redis/key.redis.js";
import type { RoomData } from "./room.controller.js";

// export const gameStart = async (roomId: string) => {
//     const roomKey: string = redisKey.getRoomKey(roomId);
//     let room = await redisFun.get(roomKey);
//     if (room == null) {
//         throw new Error("Room not found");
//     }

//     const roomData: RoomData = JSON.parse(room);
//     const diceRollPlayerIndex = commonUtils.getRandomNumber(0, 1);
//     const player = roomData.players[diceRollPlayerIndex];
// }