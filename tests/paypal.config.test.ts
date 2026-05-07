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
