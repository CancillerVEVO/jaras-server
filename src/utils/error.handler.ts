import e, { NextFunction, Request, Response } from "express";
import { AppError, ValidationError } from "../handlers/AppError";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err.message,
      issues: err.error,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err.message,
    });
  }

  return res.status(500).json({
    message: "Ha ocurrido un error inesperado",
    error: err.message,
  });
};

export { errorHandler };
