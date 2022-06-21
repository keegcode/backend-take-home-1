export default {
    type: 'http',
    method: 'POST',
    path: '/get-country-statistics',
    auth: true,
    schema: {
        body: {
            type: 'object',
            required: ['code'],
            properties: {
                code: {
                    type: 'string'
                }
            }
        }
    },
    async handler({ body }) {
        const { code } = body;
        return this
            .db('statistics')
            .select([
                'countries.id as id',
                'countries.code as code',
                this.db.raw('countries.name->>\'en\' as country'),
                'confirmed',
                'deaths',
                'recovered',
                'statistics.created_at',
                'statistics.updated_at'
            ])
            .innerJoin('countries', function () {
                this.on('countries.id', '=', 'statistics.country_id');
            })
            .where({ 'countries.code': code })
            .first();
    }
};