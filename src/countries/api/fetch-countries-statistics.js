export default {
    type: 'cron',
    cron: '0 0 * * *',
    async handler() {
        const countries = await this.db('countries');
        await Promise.all(countries.map((async (country) => {
            const { statusCode, body } = await this.request(process.env.COUNTRIES_STATISTICS_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: country.code })
            });
            if (statusCode !== 200) {
                return;
            }
            const statistics = await this.db('statistics').where({ 'country_id': country.id }).first();
            const { recovered, deaths, confirmed } = await body.json();
            if (!statistics) {
                await this.db('statistics').insert({ 'country_id': country.id, recovered, deaths, confirmed });
                return;
            }
            await this.db('statistics').update({ recovered, deaths, confirmed }).where({ id: statistics.id });
        })));
    }
};


