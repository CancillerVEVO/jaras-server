import { z } from "zod";

const createPedidoSchema = z.object({
  titulo: z
    .string({
      required_error: "El titulo es requerido",
    })
    .min(1)
    .max(255),
  descripcion: z
    .string({
      required_error: "La descripcion es requerida",
    })
    .min(1)
    .max(300),
  cliente: z
    .string({
      required_error: "El cliente es requerido",
    })
    .min(1)
    .max(255),
  lugarEntregaId: z
    .number({
      required_error: "El lugar de entrega es requerido",
    })
    .int()
    .positive(),
  anticipoPagado: z.boolean({
    required_error: "El anticipo pagado es requerido",
  }),
  fechaEstimada: z.coerce.date({
    required_error: "La fecha estimada es requerida",
  }),
  precio: z.number({
    required_error: "El precio es requerido",
  }),
});

export { createPedidoSchema };
