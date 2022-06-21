import { comparePassword } from './compare-password.js';
import { hashPassword } from './hash-password.js';

describe('utils: comparePassword & hashPassword', () => {

    test('should return true on equal passwords', async () => {
        const expected = true;
        const password = 'dummy';
        const hash = await hashPassword(password);

        const actual = await comparePassword(password, hash);

        expect(actual).toBe(expected);
    });

    test('should return false on different passwords', async () => {
        const expected = false;
        const password = 'dummy';
        const hash = await hashPassword('test.salt');

        const actual = await comparePassword(password, hash);

        expect(actual).toBe(expected);
    });

    test('if no arguments provided then will create hash of empty password', async () => {
        const hash = await hashPassword();
        const actual = await comparePassword('', hash);

        expect(actual).toBe(true);
    });

});