import { prisma } from "../../database/prisma";

const getDashboard = async () => {
  const [enProceso, entregados, cancelados] = await prisma.$transaction([
    prisma.pedidos.count({
      where: {
        estadoId: 1,
      },
    }),
    prisma.pedidos.count({
      where: {
        estadoId: 2,
      },
    }),
    prisma.pedidos.count({
      where: {
        estadoId: 3,
      },
    }),
  ]);

  const total = enProceso + entregados + cancelados;
  const pieChart = [
    {
      x: "En Proceso",
      y: enProceso,
      text: `${((enProceso * 100) / total).toFixed(2)}%`,
    },
    {
      x: "Entregados",
      y: entregados,
      text: `${((entregados * 100) / total).toFixed(2)}%`,
    },
    {
      x: "Cancelados",
      y: cancelados,
      text: `${((cancelados * 100) / total).toFixed(2)}%`,
    },
  ];

  const pedidosCompletados = await prisma.pedidos.findMany({
    where: {
      estadoId: 2,
    },
    select: {
      fechaEntrega: true,
      precio: true,
    },
  });

  const saleByDate = pedidosCompletados.map((pedido) => ({
    x: pedido.fechaEntrega,
    y: pedido.precio,
  }));

  const totalSales = pedidosCompletados.reduce(
    (acc, curr) => acc + curr.precio,
    0
  );

  const nextPayment = await prisma.pedidos.findMany({
    where: {
      estadoId: 1,
    },
    select: {
      fechaEstimada: true,
      precio: true,
      id: true,
      titulo: true,
      descripcion: true,
    },
    orderBy: {
      fechaEstimada: "asc",
    },
    take: 1,
  });

  return {
    pieChart,
    saleByDate,
    count: {
      enProceso,
      entregados,
      cancelados,
      total,
    },
    totalSales,
    nextPayment,
  };
};

export { getDashboard };
