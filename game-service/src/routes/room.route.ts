import { Router } from "express";
import { createRoom } from "../controllers/room.controller.js";


const router: Router = Router();

router.post("/", createRoom);

export default router;