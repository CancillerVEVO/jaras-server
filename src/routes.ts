import express from "express";
import { authRouter } from "./api/auth";
import { pedidosRouter } from "./api/pedidos";

const router = express.Router();

router.use("/pedidos", pedidosRouter);
router.use("/auth", authRouter);

export default router;
