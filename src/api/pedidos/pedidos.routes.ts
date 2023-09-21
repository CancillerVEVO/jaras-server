import express from "express";
import { referenciasRouter } from "../referencias";
import {
  createPedidoController,
  getPedidosController,
  getPedidoController,
  updatePedidoController,
  deletePedidoController,
  updatePedidoEstadoController,
} from "./pedidos.controller";
import { validateCreatePedido, validatePedidoId } from "./pedidos.validator";
const router = express.Router();

router.post("/", validateCreatePedido, createPedidoController);
router.get("/", getPedidosController);
router.get("/:id", validatePedidoId, getPedidoController);
router.put(
  "/:id",
  validatePedidoId,
  validateCreatePedido,
  updatePedidoController
);
router.delete("/:id", validatePedidoId, deletePedidoController);
router.put("/estado/:id", validatePedidoId, updatePedidoEstadoController);

export default router;
