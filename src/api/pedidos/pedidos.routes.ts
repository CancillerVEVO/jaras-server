import express from "express";
import { referenciasRouter } from "../referencias";
import {
  createPedidoController,
  getPedidosController,
  getPedidoController,
  updatePedidoController,
  deletePedidoController,
  getEstadosController,
} from "./pedidos.controller";
import { validateCreatePedido, validatePedidoId } from "./pedidos.validator";
const router = express.Router();

router.post("/", validateCreatePedido, createPedidoController);
router.get("/estados", getEstadosController);
router.get("/", getPedidosController);
router.get("/:id", validatePedidoId, getPedidoController);
router.put(
  "/:id",
  validatePedidoId,
  validateCreatePedido,
  updatePedidoController
);

router.delete("/:id", validatePedidoId, deletePedidoController);

export default router;
