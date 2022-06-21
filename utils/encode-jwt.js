import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export const encodeJwt = async ({ data, ...options }) => {
    return promisify(jwt.sign)(data, process.env.JWT_KEY, options);
};