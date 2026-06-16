import type { Request, Response } from "express";
import { createUserDb } from "../db/postgres/user.db.js";

export const createGuestUser = async (req: Request, res: Response) => {
    const dbRes = await createUserDb();
    res.json({
        status: "success",
        message: dbRes.message,
        data: dbRes.data
    })
}