import { prisma } from "../../database/prisma";
import fileStorage from "../../lib/files";
import { NotFoundError } from "../../handlers/AppError";

const uploadFile = async (pedidoId: number, file: Express.Multer.File) => {
  const pedidoExists = await prisma.pedidos.findUnique({
    where: {
      id: pedidoId,
    },
  });

  if (!pedidoExists) {
    throw NotFoundError.create("Pedido no encontrado");
  }

  const imageUrl = await fileStorage.uploadImage(file, "referencias/");

  const referencia = await prisma.referencias.create({
    data: {
      pedidoId: pedidoId,
      referenciaUrl: imageUrl,
    },
  });

  return referencia;
};

const deleteImage = async (imageId: number): Promise<void> => {
  const imageInDb = await prisma.referencias.findUnique({
    where: {
      id: imageId,
    },
  });

  if (!imageInDb) {
    throw NotFoundError.create("Referencia no encontrada");
  }

  const imageExists = await fileStorage.checkImageExists(
    imageInDb.referenciaUrl
  );

  if (!imageExists) {
    throw NotFoundError.create("Referencia no encontrada");
  }

  await fileStorage.deleteImage(imageInDb.referenciaUrl);

  await prisma.referencias.delete({
    where: {
      id: imageId,
    },
  });

  return;
};

export { uploadFile, deleteImage };
