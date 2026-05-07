import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import app from '../src/app';
import { errorHandler } from '../src/middlewares/errorHandler';

describe('GET /health', () => {
  it('responde con status 200 y mensaje ok', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      message: 'API funcionando correctamente'
    });
  });
});

describe('errorHandler middleware', () => {
  it('responde con 500 cuando se lanza un error', async () => {
    const testApp = express();

    testApp.get('/forzar-error', (_req: Request, _res: Response, next: NextFunction) => {
      next(new Error('error forzado'));
    });

    testApp.use(errorHandler);

    const response = await request(testApp).get('/forzar-error');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error interno del servidor' });
  });
});

function fakeRequest() {
  return {
    method: 'GET',
    url: '/test',
    headers: {},
    body: {},
    query: {},
    params: {},
    ip: '127.0.0.1',
    protocol: 'http',
    secure: false
  };
}
