import { Router } from "express";
import { createGuestUser } from "../controllers/user.controller.js";

const router: Router = Router();

router.post("/guest", createGuestUser);

export default router;