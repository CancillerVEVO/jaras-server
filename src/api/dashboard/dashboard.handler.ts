import { prisma } from "../../database/prisma";
import { format, parseISO } from "date-fns";
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

  const colors = ["#FF6384", "#36A2EB", "#FFCE56"];
  const total = enProceso + entregados + cancelados;
  const pieChart = [
    {
      type: "En Proceso",
      value: enProceso,
      color: colors[0],
    },
    {
      type: "Entregados",
      value: entregados,
      color: colors[1],
    },
    {
      type: "Cancelados",
      value: cancelados,
      color: colors[2],
    },
  ];

  const pedidosCompletados = await prisma.pedidos.findMany({
    orderBy: {
      fechaEntrega: "asc",
    },
    where: {
      estadoId: 2,
    },
    select: {
      fechaEntrega: true,
      precio: true,
    },
  });

  const salesByDateMap = new Map<string, number>();

  pedidosCompletados.forEach((pedido) => {
    const fechaEntrega = pedido.fechaEntrega ? pedido.fechaEntrega : "";
    const formattedDate = fechaEntrega
      ? format(parseISO(fechaEntrega.toISOString()), "dd/MM/yyyy")
      : "";

    if (formattedDate) {
      if (salesByDateMap.has(formattedDate)) {
        // Sumar al valor existente
        salesByDateMap.set(
          formattedDate,
          salesByDateMap.get(formattedDate)! + pedido.precio
        );
      } else {
        // Agregar una nueva entrada
        salesByDateMap.set(formattedDate, pedido.precio);
      }
    }
  });

  const saleByDate = Array.from(salesByDateMap).map((sale) => ({
    fecha: sale[0],
    total: sale[1],
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
