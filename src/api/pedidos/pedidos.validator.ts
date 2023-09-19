import { BadRequestError, ValidationError } from "../../handlers/AppError";
import { createPedidoSchema, pedidoIdSchema } from "./pedidos.schema";
import { Request, Response, NextFunction } from "express";

const validateCreatePedido = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await createPedidoSchema.safeParseAsync(req.body);

    if (!value.success) {
      throw ValidationError.create("Error de validacion", value.error.issues);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const validatePedidoId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw ValidationError.create("Error de Validacion", "Id invalido");
    }

    const value = await pedidoIdSchema.safeParseAsync(Number(id));

    if (!value.success) {
      throw ValidationError.create("Error de validacion", value.error.issues);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { validateCreatePedido, validatePedidoId };
