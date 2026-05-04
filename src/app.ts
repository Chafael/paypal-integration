import express, { Request, Response } from 'express';
import paypalRoutes from './routes/paypal.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use('/api', paypalRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

// Middleware de errores global — debe tener 4 parámetros para que Express lo reconozca
app.use(errorHandler);

export default app;