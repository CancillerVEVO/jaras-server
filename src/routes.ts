import express from "express";
import { authRouter } from "./api/auth";
import { pedidosRouter } from "./api/pedidos";
import { referenciasRouter } from "./api/referencias";
import { dashboardRouter } from "./api/dashboard";

const router = express.Router();

router.use("/pedidos", pedidosRouter);
router.use("/auth", authRouter);
router.use("/referencias", referenciasRouter);
router.use("/dashboard", dashboardRouter);
export default router;
