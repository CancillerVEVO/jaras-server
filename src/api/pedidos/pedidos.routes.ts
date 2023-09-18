import express from "express";
import {
  createPedidoController,
  getPedidosController,
  getPedidoController,
  updatePedidoController,
  deletePedidoController,
  updatePedidoEstadoController,
} from "./pedidos.controller";
const router = express.Router();

router.post("/", createPedidoController);
router.get("/", getPedidosController);
router.get("/:id", getPedidoController);
router.put("/:id", updatePedidoController);
router.delete("/:id", deletePedidoController);
router.put("/:id/estado", updatePedidoEstadoController);

export default router;
