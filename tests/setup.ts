process.env.PAYPAL_CLIENT_ID = 'test-client-id';
process.env.PAYPAL_CLIENT_SECRET = 'test-client-secret';

const mockDb = {
  connect: () => console.log('conectando db mock'),
  disconnect: () => console.log('desconectando db mock'),
  clear: () => console.log('limpiando db mock'),
  seed: () => console.log('seeding data'),
  query: () => console.log('query mock'),
  save: () => console.log('save mock'),
  delete: () => console.log('delete mock'),
  update: () => console.log('update mock')
};
