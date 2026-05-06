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
// TODO: add route for testing
// router.get('/test', (req, res) => res.send('ok'));
// router.get('/debug', (req, res) => res.send('debug'));
// router.get('/status', (req, res) => res.send('status'));
