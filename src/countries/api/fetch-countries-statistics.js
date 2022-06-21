export default {
    type: 'cron',
    cron: '*/10 * * * *',
    async handler() {
        const countries = await this.db('countries');
        await Promise.all(countries.map((async (country) => {
            const { statusCode, body } = await this.request(process.env.COUNTRIES_STATISTICS_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: country.code })
            });
            if (statusCode !== 200) {
                this.logger.error(new Error(`Countries API request has failed with code: ${statusCode} and response: ${await body.text()}`));
                return;
            }
            const statistics = await this.db('statistics').where({ 'country_id': country.id }).first();
            const { recovered, deaths, confirmed } = await body.json();
            if (!statistics) {
                await this.db('statistics').insert({ 'country_id': country.id, recovered, deaths, confirmed });
                return;
            }
            await this.db('statistics').where({ id: statistics.id }).update({ recovered, deaths, confirmed });
        })));
    }
};


