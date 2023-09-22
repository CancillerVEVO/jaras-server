import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import {
  validateFilePrescence,
  validatePedidoId,
} from "./referencias.validator";

import {
  deleteImageController,
  uploadImageController,
} from "./referencias.controller";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/:pedidoId",
  upload.single("file"),
  validateFilePrescence,
  uploadImageController
);

router.delete("/:imageId", deleteImageController);

export default router;
