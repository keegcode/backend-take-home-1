import sinon from 'sinon';
import listCountries from '../../api/list-countries.js';

describe('countries: list-countries', () => {

    test('should return list of countries in db', async () => {
        const expected = [{ id: 1 }];

        const db = sinon.stub().resolves(expected);
        const dependencies = { db };

        const actual = await listCountries.handler.bind(dependencies)();

        expect(actual).toStrictEqual(expected);
    });

});