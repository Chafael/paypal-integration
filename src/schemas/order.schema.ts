import { z } from 'zod';
export const createOrderSchema = z.object({
  amount: z.string(),
  currency: z.string().default('MXN'),
  description: z.string().optional()
});
