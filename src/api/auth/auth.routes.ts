import express from "express";
import { hashPassword } from "./auth.controller";

const router = express.Router();

router.post("/session", hashPassword);
router.delete("/session");
router.get("/session");

export default router;
