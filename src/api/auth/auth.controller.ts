import { Request, Response, NextFunction } from "express";
import { encryption } from "../../lib/encryption";

const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body;

    const hashedPassword = await encryption.encrypt(password);

    res.send({
      data: {
        password: hashedPassword,
      },
    });

    next();
  } catch (error) {
    next(error);
  }
};

export { hashPassword };
