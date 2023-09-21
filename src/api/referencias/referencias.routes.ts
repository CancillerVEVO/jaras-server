import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import { validateFilePrescence } from "./referencias.validator";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/:pedidoId",
  upload.single("file"),
  validateFilePrescence,
  async (req: Request, res: Response, next: NextFunction) => {}
);

export default router;
