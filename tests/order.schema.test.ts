import { createOrderSchema } from '../src/schemas/order.schema';

describe('createOrderSchema', () => {
  it('acepta amount y currency válidos', () => {
    const result = createOrderSchema.safeParse({ amount: '100.00', currency: 'MXN' });
    expect(result.success).toBe(true);
  });

  it('usa MXN como currency por defecto', () => {
    const result = createOrderSchema.safeParse({ amount: '50.00' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.currency).toBe('MXN');
    }
  });

  it('acepta amount sin decimales', () => {
    const result = createOrderSchema.safeParse({ amount: '100', currency: 'USD' });
    expect(result.success).toBe(true);
  });

  it('falla cuando falta amount', () => {
    const result = createOrderSchema.safeParse({ currency: 'MXN' });
    expect(result.success).toBe(false);
  });

  it('falla cuando amount tiene formato inválido', () => {
    const result = createOrderSchema.safeParse({ amount: 'abc' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('El monto debe ser un número válido (ej. 100.00)');
    }
  });

  it('falla cuando amount tiene más de 2 decimales', () => {
    const result = createOrderSchema.safeParse({ amount: '100.999' });
    expect(result.success).toBe(false);
  });

  it('falla cuando currency no tiene exactamente 3 letras', () => {
    const result = createOrderSchema.safeParse({ amount: '100.00', currency: 'PESO' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('La moneda debe ser un código de 3 letras (ej. MXN, USD)');
    }
  });
});
