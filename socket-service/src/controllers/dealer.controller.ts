import { io } from "socket.io-client";
import { dealerConfiguration, serverConfig } from "../utils/env.util.js";
import redisKey from "../db/redis/key.redis.js";
import redisFun from "../db/redis/fun.redis.js";
import type { RoomData } from "./room.controller.js";
import socketKey from "../utils/socket.utils.js";
import { RoomEvent } from "../utils/room.util.js";

export default function dealerCreate(roomId: string) {
    let timerDetails = {
        timer: null as NodeJS.Timeout | null
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
            case RoomEvent.start:
                socket.emit(socketKey.emit.dealerTurnSetReq, {
                    roomId: roomId,
                    isTimeExpire: false
                });
                break;

        }
    })

    socket.on(socketKey.on.dealerStatus, (data, callback) => {
        callback(true);
    });



    socket.on(socketKey.on.dealerTurnSetDone, (roomId) => {
        socket.emit(socketKey.emit.dealerTurnChange, roomId);
    });

    socket.on(socketKey.on.dealerTurnChangeDone, (data: any) => {
        initTimer(data.roomId, data.playerId);
    });

    function initTimer(roomId: string, playerId: string) {
        let time = 30;
        if (timerDetails.timer) {
            clearInterval(timerDetails.timer);
        }
        timerDetails.timer = setInterval(() => {
            time--;
            if (time < 0) {
                clearInterval(timerDetails.timer!);
                // socket.emit(socketKey.emit.dealerTurnSetReq, {
                //     roomId: roomId,
                //     isTimeExpire: true
                // });
                return;
            }
            socket.emit(socketKey.emit.dealerPlayerActionTimer, {
                roomId: roomId,
                playerId: playerId,
                time: time
            })
        }, 1000)


    }
}