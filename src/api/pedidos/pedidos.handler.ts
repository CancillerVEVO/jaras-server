import { Pedidos } from "@prisma/client";
import { prisma } from "../../database/prisma";

const createPedido = async (pedido: Pedidos) => {
  const nuevoPedido = await prisma.pedidos.create({
    data: pedido,
  });

  return nuevoPedido;
};

const getPedido = async (pedidoId: number) => {
  const pedido = prisma.pedidos.findUnique({
    where: {
      id: pedidoId,
    },
    include: {
      estadoPedido: true,
      lugarEntrega: true,
    },
  });

  return pedido;
};

const getPedidos = (skipValue: number, takeValue: number) => {
  return prisma.pedidos.findMany({
    skip: skipValue,
    take: takeValue,
  });
};

const updatePedido = () => {};

const deletePedido = () => {};

const updatePedidoStatus = () => {};

export {
  createPedido,
  getPedido,
  getPedidos,
  updatePedido,
  deletePedido,
  updatePedidoStatus,
};
