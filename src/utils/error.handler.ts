import { NextFunction, Request, Response } from "express";
import { AppError } from "../handlers/AppError";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      error: err.error,
    });
  }

  return res.status(500).json({
    message: "Ha ocurrido un error inesperado",
    error: err.message,
  });
};

export { errorHandler };
