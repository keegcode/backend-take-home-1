import { InvalidCredentialsException, UnauthorizedException } from './api.exceptions.js';

export default function() {
    return {
        login: async ({ email, password }) => {
            const user = await this.db('users').where({ email }).first();

            if (!user) {
                throw new InvalidCredentialsException();
            }

            const isPasswordValid = await this.utils.comparePassword(password, user.password);

            if (!isPasswordValid) {
                throw new InvalidCredentialsException();
            }

            return { token: await this.utils.encodeJwt({ data: { id: user.id } }) };
        },
        authenticate: async (authorization) => {
            if (!authorization) {
                throw new UnauthorizedException();
            }

            const token = authorization.split('Bearer ').splice(1).pop();

            if (!token) {
                throw new UnauthorizedException();
            }

            try {
                return await this.utils.decodeJwt(token);
            } catch (error) {
                this.logger.error(error);
                throw new UnauthorizedException();
            }
        }
    };
}

