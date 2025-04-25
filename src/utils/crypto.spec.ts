import { describe, it, expect, beforeAll, vi } from 'vitest';
import { encryptAES } from './crypto';

describe('encryptAES', () => {
  const testSecret = '12345678901234567890123456789012'; // 32 chars for AES-256

  beforeAll(() => {
    vi.stubEnv('VITE_AES_SECRET', testSecret);
  });

  it('should return a base64 string in iv:encrypted format', () => {
    const result = encryptAES('hello world');

    expect(result).toBeTypeOf('string');

    // expect format to be valid Base64:Base64
    const [iv, encrypted] = result.split(':');

    expect(iv).toMatch(/^[A-Za-z0-9+/=]+$/);
    expect(encrypted).toMatch(/^[A-Za-z0-9+/=]+$/);

    expect(iv.length).toBeGreaterThan(0);
    expect(encrypted.length).toBeGreaterThan(0);
  });

  it('should generate different ciphertexts for the same input due to random IVs', () => {
    const encrypted1 = encryptAES('same input');
    const encrypted2 = encryptAES('same input');

    expect(encrypted1).not.toBe(encrypted2);
  });

  it('should not throw on empty input', () => {
    const encrypted = encryptAES('');
    expect(encrypted).toBeTypeOf('string');
    expect(encrypted.includes(':')).toBe(true);
  });
});
