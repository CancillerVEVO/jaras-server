import { Request, Response, NextFunction } from "express";
import {
  createPedido,
  deletePedido,
  getPedido,
  getPedidos,
  updatePedido,
} from "./pedidos.handler";
import { successResponse } from "../../handlers/response.handler";

const PER_PAGE = 8;

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
    const skip = req.query.page ? (Number(req.query.page) - 1) * PER_PAGE : 0;
    const data = await getPedidos(skip, PER_PAGE);
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

const updatePedidoEstadoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export {
  createPedidoController,
  getPedidoController,
  getPedidosController,
  updatePedidoController,
  deletePedidoController,
  updatePedidoEstadoController,
};
