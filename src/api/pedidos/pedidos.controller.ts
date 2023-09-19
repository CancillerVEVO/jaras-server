import { Request, Response, NextFunction } from "express";

const createPedidoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("createPedidoController");
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
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
const getPedidosController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const updatePedidoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
const deletePedidoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

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
