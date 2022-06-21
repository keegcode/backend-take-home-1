export default {
    type: 'http',
    method: 'POST',
    path: '/sign-up',
    schema: {
        body: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: {
                    type: 'string',
                    format: 'email'
                },
                password: {
                    type: 'string',
                    minLength: 10
                }
            }
        }
    },
    async handler({ body }) {
        const { email, password } = body;
        const [{ id }] = await this
            .db('users')
            .insert({ email, password: await this.utils.hashPassword(password) }, ['users.id']);
        return { id };
    }
};