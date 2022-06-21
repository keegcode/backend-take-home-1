import { ApiSchema } from './api.schema.js';

describe('lib: api-schema', () => {

    test('field must be required if specified', () => {
        const fields = [
            'body',
            'query',
            'params'
        ];

        for (const field of fields) {
            const schema = { [field]: {} };
            expect(ApiSchema(schema).required).toEqual([field]);
            expect(ApiSchema(schema).properties).toEqual(schema);
        }
    });

    test('if no schema provided then nothing will be required', () => {
        const actual = ApiSchema();
        expect(actual.required).toHaveLength(0);
        expect(actual.properties).toStrictEqual({});
    });

});
