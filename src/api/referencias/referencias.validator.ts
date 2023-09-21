import { Request, Response, NextFunction } from "express";
import { BadRequestError, ValidationError } from "../../handlers/AppError";

const validateFilePrescence = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file;

  if (!file) {
    throw BadRequestError.create("No se ha enviado ningún archivo");
  }

  const allowedMimeType = ["image/png", "image/jpg", "image/jpeg"];
  const maxFileSize = 1024 * 1024 * 5; // 5MB

  const errors = [];

  if (!allowedMimeType.includes(file.mimetype)) {
    errors.push({
      mimetype: file.mimetype,
      message: `El tipo de archivo ${file.mimetype} no es válido.`,
    });
  }

  if (file.size > maxFileSize) {
    errors.push({
      size: file.size,
      message: `El tamaño del archivo ${file.size} es demasiado grande.`,
    });
  }

  if (errors.length > 0) {
    throw ValidationError.create("Errores de validación", errors);
  }

  next();
};

export { validateFilePrescence };
