import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export const decodeJwt = async (token) => {
    return promisify(jwt.verify)(token, process.env.JWT_KEY);
};