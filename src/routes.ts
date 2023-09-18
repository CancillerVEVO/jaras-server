import express from "express";
import { authRouter } from "./api/auth";
import { pedidosRouter } from "./api/pedidos";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/pedidos", pedidosRouter);

export default router;
