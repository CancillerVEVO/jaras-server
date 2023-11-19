import { Request, Response, NextFunction } from "express";
import {
  createPedido,
  deletePedido,
  getEstados,
  getPedido,
  getPedidos,
  updatePedido,
} from "./pedidos.handler";
import { successResponse } from "../../handlers/response.handler";

const createPedidoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const data = await createPedido(body);

    return successResponse(data, "Pedido creado con exito!")(res);
  } catch (error) {
    next(error);
  }
};
const getPedidoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await getPedido(Number(id));
    return successResponse(data, "Pedido obtenido con exito!")(res);
  } catch (error) {
    next(error);
  }
};
const getPedidosController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getPedidos();
    return successResponse(data, "Pedidos obtenidos con exito!")(res);
  } catch (error) {
    next(error);
  }
};

const deletePedidoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await deletePedido(Number(id));
    return successResponse(data, "Pedido eliminado con exito!")(res);
  } catch (error) {
    next(error);
  }
};

const updatePedidoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const data = await updatePedido(Number(id), body);
    return successResponse(data, "Pedido actualizado con exito!")(res);
  } catch (error) {
    next(error);
  }
};

const getEstadosController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getEstados();
    return successResponse(data, "Estados obtenidos con exito!")(res);
  } catch (error) {
    next(error);
  }
};

export {
  createPedidoController,
  getPedidoController,
  getPedidosController,
  updatePedidoController,
  deletePedidoController,
  getEstadosController,
};
