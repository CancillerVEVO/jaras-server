import { Response } from "express";

const createdResponse = (data: any = null, message = "Creado con exito!") => {
  return (res: Response) => {
    res.status(201).json({
      status: "success",
      message,
      data,
    });
  };
};

const successResponse = (data: any = null, message = "Operacion exitosa!") => {
  return (res: Response) => {
    res.status(200).json({
      status: "success",
      message,
      data,
    });
  };
};

const noContentResponse = (message = "No hay contenido") => {
  return (res: Response) => {
    res.status(200).json({
      status: "success",
      message,
      data: null,
    });
  };
};

export { createdResponse, successResponse, noContentResponse };
