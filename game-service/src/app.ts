import express from "express";
import type { Express } from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import roomRouter from "./routes/room.route.js";
import "./db/redis/client.redis.js"

const app: Express = express();

app.use(express.json({ limit: "1mb" }));
app.use(cors());

app.use("/api/v1/users",userRouter);
app.use("/api/v1/rooms",roomRouter);

export default app;


