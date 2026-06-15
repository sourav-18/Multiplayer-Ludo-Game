import { io } from "socket.io-client";
import { dealerConfiguration, serverConfig } from "../utils/env.util.js";
import redisKey from "../db/redis/key.redis.js";
import redisFun from "../db/redis/fun.redis.js";
import type { RoomData } from "./room.controller.js";

export default function dealerCreate(roomId: string) {
    let timerDetails = {
        timer: null
    }

    const joinData = {
        transports: ["websocket"],
        rejectUnauthorized: false,
        query: {
            isDealer: true,
            dealerCode: dealerConfiguration.DEALER_CODE,
            'room-id': roomId
        }
    }

    let serverUrl = "http://localhost:";
    let socket = io(serverUrl + serverConfig.PORT, joinData);

    socket.on("connect", async () => {
        console.log('dealer connected ', socket.id);

        const roomKey: string = redisKey.getRoomKey(roomId);
        let room = await redisFun.get(roomKey);
        if (room == null) {
            return;
        }
        const roomData: RoomData = JSON.parse(room);
        roomData.dealerSocketId = socket.id!;
        await redisFun.set(roomKey, JSON.stringify(roomData));

        switch (roomData.event) {
        }
    })
}