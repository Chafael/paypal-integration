import { z } from 'zod';

export const createOrderSchema = z.object({
  amount: z
    .string({ error: 'El monto es requerido' })
    .regex(/^\d+(\.\d{1,2})?$/, 'El monto debe ser un número válido (ej. 100.00)'),
  currency: z
    .string()
    .length(3, 'La moneda debe ser un código de 3 letras (ej. MXN, USD)')
    .optional()
    .default('MXN'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
