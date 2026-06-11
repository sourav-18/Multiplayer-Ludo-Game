import express from "express";
import http from "http";
import { Server as socketIoServer } from "socket.io";
import socketFun from "./socket.js";
import "./db/redis/client.redis.js";
import { joinValidate } from "./middlewares/connection.middleware.js";

const app = express();

const httpsOptions = {}
const httpServer = http.createServer(httpsOptions, app);

export const io = new socketIoServer(httpServer, {
    allowEIO3: true,
    serveClient: true,
    cors: {
        origin: "*",
        credentials: true,
    },
    pingTimeout: 20000,
    pingInterval: 1000,
    transports: ["websocket"],
});

io.use(joinValidate).on("connection", socketFun)

export default httpServer;


