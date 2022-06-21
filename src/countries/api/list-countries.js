export default {
    type: 'http',
    path: '/countries',
    method: 'GET',
    auth: true,
    async handler() {
        return this.db('countries');
    }
};
