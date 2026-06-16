import express from "express";
import type { Express } from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app: Express = express();

app.use(express.json({ limit: "1mb" }));
app.use(cors());

app.use("/api/v1/users",userRouter)

export default app;


