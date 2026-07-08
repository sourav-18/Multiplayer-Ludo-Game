import { Router } from "express";
import { createRoom, getRejoinRoomData } from "../controllers/room.controller.js";


const router: Router = Router();

router.post("/", createRoom);
router.get("/rejoin/:roomId", getRejoinRoomData);

export default router;