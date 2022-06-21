import sinon from 'sinon';
import fetchCountriesStatistics from '../../api/fetch-countries-statistics.js';

const getDependencies = ({ country, statusCode, body, statistics }) => {
    const first = sinon.stub().resolves(statistics);
    const insert = async () => {};
    const update = async () => {};

    const db = {
        where() {
            return this;
        },
        first,
        insert,
        update
    };

    const insertSpy = sinon.spy(db, 'insert');
    const updateSpy = sinon.spy(db, 'update');
    const whereSpy = sinon.spy(db, 'where');

    const dbStub = sinon.stub().returns(db);

    dbStub.withArgs('countries').resolves([country]);

    const json = sinon.stub().resolves(body);
    const text = sinon.stub().resolves(body);

    const request = sinon.stub().resolves({ statusCode, body: { json, text } });

    const error = () => {};

    const logger = { error };

    const errorSpy = sinon.spy(logger, 'error');

    const dependencies = {
        db: dbStub,
        request,
        logger
    };

    const spies = {
        insertSpy,
        updateSpy,
        errorSpy,
        whereSpy
    };

    return { dependencies, spies };
};

describe('countries: fetch-countries-statistics', function () {

    test('should insert new statistics if doesnt exist', async () => {
        const country = { id: 1 };
        const statistics = null;
        const expected = { 'country_id': country.id, recovered: 1, deaths: 1, confirmed: 1 };

        const { dependencies, spies } = getDependencies({ country: country, statusCode: 200, body: expected, statistics });

        await fetchCountriesStatistics.handler.bind(dependencies)();

        expect(spies.insertSpy.calledWithExactly(expected)).toBe(true);
    });

    test('should update existing statistics if exist', async () => {
        const country = { id: 1 };
        const statistics = { id: 2 };
        const expected = { where: { id: statistics.id }, update: { recovered: 1, deaths: 1, confirmed: 1 } };

        const { dependencies, spies } = getDependencies({ country: country, statusCode: 200, body: expected.update, statistics });

        await fetchCountriesStatistics.handler.bind(dependencies)();

        expect(spies.whereSpy.calledWithExactly(expected.where)).toBe(true);
        expect(spies.updateSpy.calledWithExactly(expected.update)).toBe(true);
    });

    test('should log error if request failed', async () => {
        const country = { id: 1 };
        const statistics = null;
        const body = 'Bad Request';
        const statusCode = 400;
        const expected = `Countries API request has failed with code: ${statusCode} and response: ${body}`;

        const { dependencies, spies } = getDependencies({ country: country, statusCode, body, statistics });

        await fetchCountriesStatistics.handler.bind(dependencies)();

        const { args } = spies.errorSpy.getCall(-1);
        const { message } = args[0];

        expect(message).toBe(expected);
    });

});