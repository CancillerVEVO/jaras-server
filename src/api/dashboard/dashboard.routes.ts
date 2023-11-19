import express from "express";
import { getDashBoardController } from "./dashboard.controller";
const router = express.Router();

router.get("/", getDashBoardController);

export default router;
