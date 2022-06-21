export default {
    type: 'http',
    method: 'POST',
    path: '/sign-in',
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
        return this.auth.login({ email, password });
    }
};