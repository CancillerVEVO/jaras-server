import { createPedidoSchema } from "./pedidos.schema";
import { Request, Response, NextFunction } from "express";

const validateCreatePedido = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await createPedidoSchema.safeParseAsync(req.body);

    if (!value.success) {
      res.status(400).send({
        message: value.error.issues,
      });
      next();
    }
  } catch (error) {
    next(error);
  }
};

export { validateCreatePedido };
