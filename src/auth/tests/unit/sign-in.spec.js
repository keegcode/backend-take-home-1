import signIn from '../../api/sign-in.js';
import sinon from 'sinon';

describe('auth: sign-in', () => {

    test('should call login once with provided arguments', async () => {
        const expected = { email: 'example@mail.com', password: 'dummy' };

        const login = () => ({ token: 'token' });
        const auth = { login };
        const dependencies = { auth };

        const spy = sinon.spy(auth, 'login');

        await signIn.handler.bind(dependencies)({ body: { ...expected } });

        expect(spy.calledWithExactly(expected)).toBe(true);
    });

});