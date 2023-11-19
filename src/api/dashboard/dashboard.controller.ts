import { NextFunction, Request, Response } from "express";
import { getDashboard } from "./dashboard.handler";
import { successResponse } from "../../handlers/response.handler";

const getDashBoardController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getDashboard();
    return successResponse(data, "Dashboard obtenido con exito!")(res);
  } catch (error) {
    next(error);
  }
};

export { getDashBoardController };
