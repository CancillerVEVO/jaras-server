import express from "express";
import { authRouter } from "./api/auth";
import { pedidosRouter } from "./api/pedidos";
import { referenciasRouter } from "./api/referencias";

const router = express.Router();

router.use("/pedidos", pedidosRouter);
router.use("/auth", authRouter);
router.use("/referencias", referenciasRouter);

export default router;
