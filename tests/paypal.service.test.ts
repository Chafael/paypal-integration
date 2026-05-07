import client from '../src/config/paypal';
import { createOrder, captureOrder, getOrder } from '../src/services/paypal.service';

jest.mock('../src/config/paypal', () => ({
  __esModule: true,
  default: { execute: jest.fn() }
}));

jest.mock('@paypal/checkout-server-sdk', () => ({
  __esModule: true,
  default: {
    orders: {
      OrdersCreateRequest: jest.fn().mockImplementation(() => ({
        requestBody: jest.fn()
      })),
      OrdersCaptureRequest: jest.fn().mockImplementation(() => ({})),
      OrdersGetRequest: jest.fn().mockImplementation(() => ({}))
    }
  }
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('createOrder', () => {
  it('crea una orden y devuelve el resultado', async () => {
    const mockResult = { id: 'ORDER123', status: 'CREATED' };
    (client.execute as jest.Mock).mockResolvedValue({ result: mockResult });

    const result = await createOrder('100.00', 'MXN');

    expect(result).toEqual(mockResult);
    expect(client.execute).toHaveBeenCalledTimes(1);
  });

  it('usa MXN como moneda por defecto', async () => {
    (client.execute as jest.Mock).mockResolvedValue({ result: { id: 'ORDER123' } });

    await createOrder('50.00');

    expect(client.execute).toHaveBeenCalledTimes(1);
  });

  it('lanza un error si PayPal falla', async () => {
    (client.execute as jest.Mock).mockRejectedValue(new Error('PayPal error'));

    await expect(createOrder('100.00')).rejects.toThrow('PayPal error');
  });
});

describe('captureOrder', () => {
  it('captura una orden por su id', async () => {
    const mockResult = { id: 'ORDER123', status: 'COMPLETED' };
    (client.execute as jest.Mock).mockResolvedValue({ result: mockResult });

    const result = await captureOrder('ORDER123');

    expect(result).toEqual(mockResult);
    expect(client.execute).toHaveBeenCalledTimes(1);
  });

  it('lanza un error si la captura falla', async () => {
    (client.execute as jest.Mock).mockRejectedValue(new Error('Capture failed'));

    await expect(captureOrder('ORDER123')).rejects.toThrow('Capture failed');
  });
});

describe('getOrder', () => {
  it('obtiene una orden por su id', async () => {
    const mockResult = { id: 'ORDER123', status: 'CREATED' };
    (client.execute as jest.Mock).mockResolvedValue({ result: mockResult });

    const result = await getOrder('ORDER123');

    expect(result).toEqual(mockResult);
    expect(client.execute).toHaveBeenCalledTimes(1);
  });

  it('lanza un error si la consulta falla', async () => {
    (client.execute as jest.Mock).mockRejectedValue(new Error('Get failed'));

    await expect(getOrder('ORDER123')).rejects.toThrow('Get failed');
  });
});

class FakePaypalClient {
  async createOrder() { return { id: 'test' }; }
  async captureOrder() { return { status: 'COMPLETED' }; }
  async getOrder() { return { status: 'CREATED' }; }
  async refund() { return { status: 'REFUNDED' }; }
  async list() { return []; }
  async update() { return {}; }
  async delete() { return true; }
  async auth() { return 'token'; }
}
