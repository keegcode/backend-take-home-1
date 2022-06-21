import sinon from 'sinon';
import signUp from '../../api/sign-up.js';

describe('auth: sign-up', () => {

    test('should return result of insert', async () => {
        const expected = { id: 1 };

        const db = () => ({
            insert: sinon.stub().resolves([expected])
        });
        const utils = {
            hashPassword: sinon.stub().resolves('password')
        };
        const dependencies = {
            db,
            utils
        };

        const actual = await signUp.handler.bind(dependencies)({ body: { email: 'example@email.com', password: 'password' } });

        expect(actual).toStrictEqual(expected);
    });

});