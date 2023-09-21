class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  error: any;

  constructor(message: string, statusCode: number, error = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.error = error;

    Error.captureStackTrace(this, this.constructor);
  }

  static create(message: string, statusCode: number, error = null) {
    return new this(message, statusCode, error);
  }
}

class BadRequestError extends AppError {
  constructor(
    message: string = "Bad Request",
    statusCode: number = 400,
    error: any = null
  ) {
    super(message, statusCode, error);
    this.name = "BadRequestError";
  }

  static create(message: string = "Bad Request", error: any = null) {
    return new BadRequestError(message, 400, error);
  }
}

class NotFoundError extends AppError {
  constructor(
    message: string = "No encontrado",
    statusCode: number = 404,
    error: any = null
  ) {
    super(message, statusCode, error);
    this.name = "NotFoundError";
  }

  static create(message: string = "No encontrado", error: any = null) {
    return new NotFoundError(message, 404, error);
  }
}

class ValidationError extends AppError {
  constructor(
    message: string = "Error de validacion",
    statusCode: number = 422,
    error: any = null
  ) {
    super(message, statusCode, error);
    this.name = "ValidationError";
  }

  static create(message: string = "Error de validacion", error: any = null) {
    return new ValidationError(message, 422, error);
  }
}
class UnauthorizedError extends AppError {
  constructor(
    message: string = "No autorizado",
    statusCode: number = 401,
    error: any = null
  ) {
    super(message, statusCode, error);
    this.name = "UnauthorizedError";
  }

  static create(message: string = "No autorizado", error: any = null) {
    return new UnauthorizedError(message, 401, error);
  }
}
export {
  AppError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
};
