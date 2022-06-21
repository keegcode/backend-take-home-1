import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

export const hashPassword = async (password = '', salt = '') => {
    const random = salt.length ? Buffer.from(salt, 'hex') : await promisify(randomBytes)(32);
    const key = await promisify(scrypt)(password, random, 64);
    return `${key.toString('hex')}.${random.toString('hex')}`;
};