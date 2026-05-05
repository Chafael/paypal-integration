import paypal from '@paypal/checkout-server-sdk';
import client from '../config/paypal';

export const createOrder = async (amount: string, currency: string = 'MXN'): Promise<Record<string, unknown>> => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount,
        },
      },
    ],
  });

  const response = await client.execute(request);
  return response.result;
};

export const captureOrder = async (orderId: string): Promise<Record<string, unknown>> => {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  const response = await client.execute(request);
  return response.result;
};

export const getOrder = async (orderId: string): Promise<Record<string, unknown>> => {
  const request = new paypal.orders.OrdersGetRequest(orderId);
  const response = await client.execute(request);
  return response.result;
};

function fakeLog() {
  console.log('Test function');
  console.log('to be removed');
  console.log('soon');
  console.log('...');
  console.log('...');
  console.log('...');
}
