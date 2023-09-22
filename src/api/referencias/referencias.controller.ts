import { NextFunction, Request, Response } from "express";

import { deleteImage, uploadFile } from "./referencias.handler";
import { ValidationError } from "../../handlers/AppError";
import { successResponse } from "../../handlers/response.handler";

const uploadImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pedidoId } = req.params;
    if (isNaN(Number(pedidoId))) {
      throw ValidationError.create("Error de Validacion", "Id invalido");
    }

    if (!req.file) {
      throw ValidationError.create("Error de Validacion", "Archivo invalido");
    }

    const referencia = await uploadFile(Number(pedidoId), req.file);
    return successResponse(referencia, "Referencia subida con exito!")(res);
  } catch (error) {
    next(error);
  }
};

const deleteImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { imageId } = req.params;

    if (isNaN(Number(imageId))) {
      throw ValidationError.create("Error de Validacion", "Id invalido");
    }

    await deleteImage(Number(imageId));

    return successResponse(null, "Referencia eliminada con exito!")(res);
  } catch (error) {
    next(error);
  }
};

export { uploadImageController, deleteImageController };
