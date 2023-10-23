import { Pedidos } from "@prisma/client";
import { prisma } from "../../database/prisma";
import {
  BadRequestError,
  NotFoundError,
  ValidationError,
} from "../../handlers/AppError";
import fileStorage from "../../lib/files";

const createPedido = async (pedido: Pedidos) => {
  const nuevoPedido = await prisma.pedidos.create({
    data: pedido,
  });

  return nuevoPedido;
};

const getPedido = async (pedidoId: number) => {
  const data = await prisma.pedidos.findUnique({
    where: {
      id: pedidoId,
    },
    include: {
      estadoPedido: {
        select: {
          id: true,
          estado: true,
        },
      },
      lugarEntrega: {
        select: {
          id: true,
          lugar: true,
        },
      },

      referencias: {
        select: {
          id: true,
          referenciaUrl: true,
        },
      },
    },
  });

  if (!data) {
    throw NotFoundError.create("No encontrado", "Pedido no encontrado");
  }

  const pedido = {
    id: data?.id,
    titulo: data?.titulo,
    descripcion: data?.descripcion,
    cliente: data?.cliente,
    estadoPedido: data?.estadoPedido.estado,
    estadoPedidoId: data?.estadoPedido.id,
    lugarEntrega: data?.lugarEntrega.lugar,
    lugarEntregaId: data?.lugarEntrega.id,
    anticipoPagado: data?.anticipoPagado,
    precio: data?.precio,
    fechaEstimada: data?.fechaEstimada,
    fechaCreacion: data?.fechaCreacion,
    fechaEntrega: data?.fechaEntrega,
    fechaCancelacion: data?.fechaCancelado,
    referencias: data?.referencias,
  };
  return {
    pedido,
  };
};

const getPedidos = async (skipValue: number, takeValue: number) => {
  const [estados, lugares, pedidos, totalResults] = await prisma.$transaction([
    prisma.estadoPedidos.findMany(),
    prisma.lugarEntrega.findMany(),
    prisma.pedidos.findMany({
      skip: skipValue,
      take: takeValue,
      include: {
        estadoPedido: {
          select: {
            estado: true,
            id: true,
          },
        },
        lugarEntrega: {
          select: {
            lugar: true,
          },
        },
      },
    }),
    prisma.pedidos.count(),
  ]);

  return {
    estados,
    lugares,
    pedidos: pedidos.map((pedido) => ({
      id: pedido.id,
      titulo: pedido.titulo,
      descripcion: pedido.descripcion,
      cliente: pedido.cliente,
      estadoPedido: pedido.estadoPedido.id,
      lugarEntrega: pedido.lugarEntrega.lugar,
      anticipoPagado: pedido.anticipoPagado,
      precio: pedido.precio,
      fechaEstimada: pedido.fechaEstimada,
      fechaCreacion: pedido.fechaCreacion,
      fechaEntrega: pedido.fechaEntrega,
      fechaCancelacion: pedido.fechaCancelado,
    })),
    totalResults,
    page: skipValue / takeValue + 1,
    totalPages: Math.ceil(totalResults / takeValue),
  };
};

const updatePedido = async (pedidoId: number, pedido: Pedidos) => {
  const isPedido = await prisma.pedidos.findUnique({
    where: {
      id: pedidoId,
    },
  });

  if (!isPedido) {
    throw NotFoundError.create("No encontrado", "Pedido no encontrado");
  }

  switch (pedido.estadoId) {
    case 1:
      pedido.fechaEntrega = null;
      pedido.fechaCancelado = null;
      break;

    case 2:
      pedido.fechaCancelado = null;
      pedido.fechaEntrega = new Date();
      break;

    case 3:
      pedido.fechaCancelado = new Date();
      pedido.fechaEntrega = null;
      break;
    default:
      throw ValidationError.create(
        "Error de validacion",
        `El estado de pedido ${pedido.estadoId} es invalido . [1: En proceso. 2. Entregado. 3. Cancelado]`
      );
  }

  const updatedPedido = await prisma.pedidos.update({
    where: {
      id: pedidoId,
    },
    data: pedido,
  });

  return updatedPedido;
};

const deletePedido = async (pedidoId: number) => {
  const pedido = await prisma.pedidos.findUnique({
    where: {
      id: pedidoId,
    },
    include: {
      referencias: {
        select: {
          id: true,
          referenciaUrl: true,
        },
      },
    },
  });

  if (!pedido) {
    throw NotFoundError.create("No encontrado", "Pedido no encontrado");
  }

  if (pedido.referencias.length > 0) {
    await Promise.all(
      pedido.referencias.map(
        async (referencia) =>
          await fileStorage.deleteImage(referencia.referenciaUrl)
      )
    );
  }

  const deletedPedido = await prisma.pedidos.delete({
    where: {
      id: pedidoId,
    },
  });

  return deletedPedido;
};

const getEstados = async () => {
  const [estados, lugares] = await prisma.$transaction([
    prisma.estadoPedidos.findMany(),
    prisma.lugarEntrega.findMany(),
  ]);

  return {
    estados,
    lugares,
  };
};

export {
  createPedido,
  getPedido,
  getPedidos,
  updatePedido,
  deletePedido,
  getEstados,
};
