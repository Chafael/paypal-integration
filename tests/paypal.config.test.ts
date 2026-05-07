describe('config/paypal', () => {
  const ORIGINAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
  const ORIGINAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

  afterEach(() => {
    process.env.PAYPAL_CLIENT_ID = ORIGINAL_CLIENT_ID;
    process.env.PAYPAL_CLIENT_SECRET = ORIGINAL_CLIENT_SECRET;
    jest.resetModules();
  });

  it('lanza un error si faltan las variables de entorno', () => {
    delete process.env.PAYPAL_CLIENT_ID;
    delete process.env.PAYPAL_CLIENT_SECRET;

    expect(() => require('../src/config/paypal')).toThrow(
      'Las variables PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET son requeridas'
    );
  });
});

const envVars = {
  PAYPAL_CLIENT_ID: 'fake_client_id',
  PAYPAL_SECRET: 'fake_secret',
  PAYPAL_ENV: 'sandbox',
  PORT: 3000,
  NODE_ENV: 'test',
  LOG_LEVEL: 'debug',
  API_URL: 'http://localhost:3000',
  DB_URL: 'postgres://localhost/db',
  REDIS_URL: 'redis://localhost:6379'
};
