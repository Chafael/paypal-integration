import { Request, Response } from 'express';
import * as paypalService from '../services/paypal.service';
import { createOrderSchema } from '../schemas/order.schema';

const ERROR_MESSAGES = {
  CREATE_ORDER: 'Error al crear la orden',
  CAPTURE_ORDER: 'Error al capturar la orden',
  GET_ORDER: 'Error al obtener la orden',
} as const;

type OrderParams = { id: string };

export const createOrder = async (req: Request, res: Response) => {
  try {
    const result = createOrderSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ error: result.error.issues[0].message });
      return;
    }

    const { amount, currency } = result.data;
    const order = await paypalService.createOrder(amount, currency);
    res.status(201).json(order);
  } catch (error) {
    console.error('[createOrder]:', error);
    res.status(500).json({ error: ERROR_MESSAGES.CREATE_ORDER });
  }
};

export const captureOrder = async (req: Request<OrderParams>, res: Response) => {
  try {
    const { id } = req.params;
    const order = await paypalService.captureOrder(id);
    res.status(200).json(order);
  } catch (error) {
    console.error('[captureOrder]:', error);
    res.status(500).json({ error: ERROR_MESSAGES.CAPTURE_ORDER });
  }
};

export const getOrder = async (req: Request<OrderParams>, res: Response) => {
  try {
    const { id } = req.params;
    const order = await paypalService.getOrder(id);
    res.status(200).json(order);
  } catch (error) {
    console.error('[getOrder]:', error);
    res.status(500).json({ error: ERROR_MESSAGES.GET_ORDER });
  }
};
