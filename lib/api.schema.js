export const ApiSchema = ({ body, query, params } = {}) => {
    const required = [];
    const properties = {};

    if (body) {
        required.push('body');
        properties.body = body;
    }

    if (query) {
        required.push('query');
        properties.query = query;
    }

    if (params) {
        required.push('params');
        properties.params = params;
    }

    return {
        type: 'object',
        required,
        properties
    };
};