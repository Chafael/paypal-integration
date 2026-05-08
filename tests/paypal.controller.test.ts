import request from 'supertest';
import app from '../src/app';
import * as paypalService from '../src/services/paypal.service';

jest.mock('../src/services/paypal.service');

const mockCreateOrder = paypalService.createOrder as jest.Mock;
const mockCaptureOrder = paypalService.captureOrder as jest.Mock;
const mockGetOrder = paypalService.getOrder as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('POST /api/orders', () => {
  it('responde 201 cuando se recibe amount y currency válidos', async () => {
    const mockOrder = { id: 'ORDER123', status: 'CREATED' };
    mockCreateOrder.mockResolvedValue(mockOrder);

    const response = await request(app)
      .post('/api/orders')
      .send({ amount: '100.00', currency: 'MXN' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockOrder);
    expect(mockCreateOrder).toHaveBeenCalledWith('100.00', 'MXN');
  });

  it('responde 201 usando MXN por defecto cuando no se envía currency', async () => {
    const mockOrder = { id: 'ORDER123', status: 'CREATED' };
    mockCreateOrder.mockResolvedValue(mockOrder);

    const response = await request(app)
      .post('/api/orders')
      .send({ amount: '50.00' });

    expect(response.status).toBe(201);
    expect(mockCreateOrder).toHaveBeenCalledWith('50.00', 'MXN');
  });

  it('responde 400 cuando falta el amount', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({ currency: 'MXN' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'El monto es requerido' });
    expect(mockCreateOrder).not.toHaveBeenCalled();
  });

  it('responde 400 cuando el amount tiene formato inválido', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({ amount: 'abc', currency: 'MXN' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'El monto debe ser un número válido (ej. 100.00)' });
    expect(mockCreateOrder).not.toHaveBeenCalled();
  });

  it('responde 400 cuando currency no tiene 3 letras', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({ amount: '100.00', currency: 'PESO' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'La moneda debe ser un código de 3 letras (ej. MXN, USD)' });
    expect(mockCreateOrder).not.toHaveBeenCalled();
  });

  it('responde 500 cuando el servicio lanza un error', async () => {
    mockCreateOrder.mockRejectedValue(new Error('PayPal error'));

    const response = await request(app)
      .post('/api/orders')
      .send({ amount: '100.00' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error al crear la orden' });
  });
});

describe('GET /api/orders/:id', () => {
  it('responde 200 con los datos de la orden', async () => {
    const mockOrder = { id: 'ORDER123', status: 'CREATED' };
    mockGetOrder.mockResolvedValue(mockOrder);

    const response = await request(app).get('/api/orders/ORDER123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOrder);
    expect(mockGetOrder).toHaveBeenCalledWith('ORDER123');
  });

  it('responde 500 cuando el servicio lanza un error', async () => {
    mockGetOrder.mockRejectedValue(new Error('Get failed'));

    const response = await request(app).get('/api/orders/ORDER123');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error al obtener la orden' });
  });
});

describe('POST /api/orders/:id/capture', () => {
  it('responde 200 con la orden capturada', async () => {
    const mockOrder = { id: 'ORDER123', status: 'COMPLETED' };
    mockCaptureOrder.mockResolvedValue(mockOrder);

    const response = await request(app).post('/api/orders/ORDER123/capture');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOrder);
    expect(mockCaptureOrder).toHaveBeenCalledWith('ORDER123');
  });

  it('responde 500 cuando el servicio lanza un error', async () => {
    mockCaptureOrder.mockRejectedValue(new Error('Capture failed'));

    const response = await request(app).post('/api/orders/ORDER123/capture');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error al capturar la orden' });
  });
});
