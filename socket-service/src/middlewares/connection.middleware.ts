import type { ExtendedError, Socket } from "socket.io";
import redisKey from "../db/redis/key.redis.js";
import redisFun from "../db/redis/fun.redis.js";
import { disconnectBySocketId } from "../controllers/io.controller.js";
import { dealerConfiguration } from "../utils/env.util.js";

export interface SocketData {
    id: string,
    playerId: string,
    roomId: string,
    playerName: string,
    dealer: boolean
}

export const joinValidate = async (socket: Socket, next: (err?: ExtendedError) => void) => {
    const isDealer = socket.handshake.query.isDealer;
    const dealerCode = socket.handshake.query.dealerCode;
    const roomId = socket.handshake.headers['room-id'] || socket.handshake.query['room-id'];
    if (isDealer && dealerCode == dealerConfiguration.DEALER_CODE) {
        socket.data.dealer = true;
        socket.data.roomId = roomId;
        return next();
    }

    const playerId = socket.handshake.headers['player-id'] || socket.handshake.query['player-id'];
    const playerName = socket.handshake.headers['player-name'] || socket.handshake.query['player-name'] || 'guest';

    if (!playerId || !roomId) {
        next(new Error('Incomplete data'));
        return;
    }

    await createOrUpdate(playerId as string, socket.id);

    const socketData: SocketData = {
        id: socket.id,
        roomId: roomId as string,
        playerId: playerId as string,
        playerName: playerName as string,
        dealer: false
    }

    socket.data = socketData;
    next();
}

async function createOrUpdate(playerId: string, socketId: string) {
    let sessionKey: string = redisKey.getSessionKey(playerId);
    await redisFun.setLock(sessionKey);
    let session = await redisFun.get(sessionKey);
    if (session) {
        disconnectBySocketId(session); //disconnect same old socket
    }
    redisFun.set(sessionKey, socketId);
    await redisFun.releaseLock(sessionKey)
    return;
}