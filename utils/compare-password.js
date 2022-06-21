import { hashPassword } from './hash-password.js';

export const comparePassword = async (password, hash) => {
    const salt = hash.split('.').slice(1).pop();
    return await hashPassword(password, salt) === hash;
};
