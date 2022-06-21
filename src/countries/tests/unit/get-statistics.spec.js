import sinon from 'sinon';
import getStatistics from '../../api/get-statistics.js';

describe('countries: get-statistics', () => {

    test('should return country statistics from db with specified code', async () => {
        const expected = [{ id: 1 }];
        const code = 'UA';

        const db = {
            on() {
                return this;
            },
            select: sinon.stub().returnsThis(),
            innerJoin(table, callback) {
                callback.bind(this)(table);
                return this;
            },
            where() {
                return this;
            },
            first: sinon.stub().resolves(expected)
        };

        const stub = sinon.stub().returns(db);
        stub.raw = sinon.stub().returns('');

        const whereSpy = sinon.spy(db, 'where');
        const onSpy = sinon.spy(db, 'on');

        const dependencies = { db: stub };

        const actual = await getStatistics.handler.bind(dependencies)({ body: { code } });

        expect(actual).toStrictEqual(expected);
        expect(whereSpy.calledWithExactly({ 'countries.code': code })).toBe(true);
        expect(onSpy.calledWithExactly('countries.id', '=', 'statistics.country_id')).toBe(true);
    });

});