import { Pedidos } from "@prisma/client";
import { prisma } from "../../database/prisma";
import { NotFoundError } from "../../handlers/AppError";

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
          estado: true,
        },
      },
      lugarEntrega: {
        select: {
          lugar: true,
        },
      },
    },
  });
  const pedido = {
    id: data?.id,
    titulo: data?.titulo,
    descripcion: data?.descripcion,
    cliente: data?.cliente,
    estadoPedido: data?.estadoPedido.estado,
    lugarEntrega: data?.lugarEntrega.lugar,
    anticipoPagado: data?.anticipoPagado,
    precio: data?.precio,
    fechaEstimada: data?.fechaEstimada,
    fechaCreacion: data?.fechaCreacion,
    fechaEntrega: data?.fechaEntrega,
    fechaCancelacion: data?.fechaCancelado,
  };
  return pedido;
};

const getPedidos = async (skipValue: number, takeValue: number) => {
  const [pedidos, totalResults] = await prisma.$transaction([
    prisma.pedidos.findMany({
      orderBy: {
        fechaCreacion: "desc",
      },
      skip: skipValue,
      take: takeValue,
      include: {
        estadoPedido: {
          select: {
            estado: true,
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
    pedidos: pedidos.map((pedido) => ({
      id: pedido.id,
      titulo: pedido.titulo,
      descripcion: pedido.descripcion,
      cliente: pedido.cliente,
      estadoPedido: pedido.estadoPedido.estado,
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

  const updatedPedido = await prisma.pedidos.update({
    where: {
      id: pedidoId,
    },
    data: pedido,
  });

  return updatedPedido;
};

const deletePedido = async (pedidoId: number) => {
  const isPedido = await prisma.pedidos.findUnique({
    where: {
      id: pedidoId,
    },
  });

  if (!isPedido) {
    throw NotFoundError.create("No encontrado", "Pedido no encontrado");
  }

  const deletedPedido = await prisma.pedidos.delete({
    where: {
      id: pedidoId,
    },
  });

  return deletedPedido;
};

const updatePedidoStatus = () => {};

export {
  createPedido,
  getPedido,
  getPedidos,
  updatePedido,
  deletePedido,
  updatePedidoStatus,
};
