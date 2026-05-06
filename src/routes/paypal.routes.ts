import { Router } from 'express';
import {
  createOrder,
  captureOrder,
  getOrder,
} from '../controllers/paypal.controller';

const router = Router();

router.post('/orders', createOrder);
router.post('/orders/:id/capture', captureOrder);
router.get('/orders/:id', getOrder);

export default router;