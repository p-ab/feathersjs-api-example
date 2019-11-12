import app from '../../src/app';

describe('\'products\' service', () => {
  it('registered the service', () => {
    const service = app.service('products');
    expect(service).toBeTruthy();
  });

  it('autenticate the service', () => {
    const service = app.service('authentication');
    expect(service).toBeTruthy();
  });

  it('create products', async () => {
    const product = await app.service('products').create({
      "title": "iPhone X 32Gb",
      "price": 1700,
      "quantity": 3,
      "additional": "Test data"
    }, { user: { _id: '5dc8ea53e9703850c88fc3c3' } });
    expect(!product.additional).toBe(true);
  })
});
