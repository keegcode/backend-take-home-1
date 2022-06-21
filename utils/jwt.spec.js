import { encodeJwt } from './encode-jwt.js';
import { decodeJwt } from './decode-jwt.js';

describe('utils: decode-jwt & encode-jwt', () => {
    beforeAll(() => {
        process.env.JWT_KEY = 'secret';
    });

    test('should encode and decode valid jwt', async () => {
        const expected = { id: 1 };
        const token = await encodeJwt({ data: expected });

        const actual = await decodeJwt(token);

        expect(actual.id).toBe(expected.id);
    });

    test('should throw when decoding invalid jwt', async () => {
        await expect(decodeJwt('token')).rejects.toThrow();
    });
});