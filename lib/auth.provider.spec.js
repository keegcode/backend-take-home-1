import AuthProvider from './auth.provider.js';
import sinon from 'sinon';
import { InvalidCredentialsException, UnauthorizedException } from './api.exceptions.js';

const getDependencies = ({ user = {}, isValidPassword = true, token = '', decodeJwtException = false } = {}) => {
    const db = () => ({
        where: sinon.stub().returnsThis(),
        first: sinon.stub().resolves(user)
    });

    const utils = {
        comparePassword: sinon.stub().resolves(isValidPassword),
        encodeJwt: sinon.stub().resolves(token),
        decodeJwt: decodeJwtException ? sinon.stub().rejects() : sinon.stub().resolves(user)
    };

    const logger = {
        error: sinon.stub()
    };

    return {
        db,
        utils,
        logger
    };
};

describe('lib: auth-provider', () => {

    test('should login if user is present and password is valid', async () => {
        const expected = 'token';

        const credentials = { email: 'example@email.com', password: '123456' };
        const dependencies = getDependencies({
            user: { id: 1 },
            isValidPassword: true,
            token: expected
        });

        const { login } = AuthProvider.bind(dependencies)();

        const { token: actual } = await login(credentials);

        expect(expected).toBe(actual);
    });

    test('should not login if user is not present', async () => {
        const credentials = { email: 'example@email.com', password: '123456' };
        const dependencies = getDependencies({
            user: null,
            isValidPassword: true
        });

        const { login } = AuthProvider.bind(dependencies)();

        await expect(login(credentials)).rejects.toBeInstanceOf(InvalidCredentialsException);
    });

    test('should not login if user password is not valid', async () => {
        const credentials = { email: 'example@email.com', password: '123456' };
        const dependencies = getDependencies({
            user: { id: 1 },
            isValidPassword: false
        });

        const { login } = AuthProvider.bind(dependencies)();

        await expect(login(credentials)).rejects.toBeInstanceOf(InvalidCredentialsException);
    });

    test('should authenticate if token is valid and present', async () => {
        const expected = { id: 1 };
        const dependencies = getDependencies({ user: expected });

        const { authenticate } = AuthProvider.bind(dependencies)();

        const actual = await authenticate('Bearer token');

        expect(expected.id).toBe(actual.id);
    });

    test('should not authenticate if header is missing', async () => {
        const { authenticate } = AuthProvider();
        await expect(authenticate()).rejects.toBeInstanceOf(UnauthorizedException);
    });

    test('should not authenticate if header is not in \'Bearer {token}\' format', async () => {
        const { authenticate } = AuthProvider();
        await expect(authenticate('Bearer')).rejects.toBeInstanceOf(UnauthorizedException);
    });

    test('should throw on invalid token', async () => {
        const dependencies = getDependencies({ decodeJwtException: true });

        const { authenticate } = AuthProvider.bind(dependencies)();
        await expect(authenticate('Bearer token')).rejects.toBeInstanceOf(UnauthorizedException);
    });
});