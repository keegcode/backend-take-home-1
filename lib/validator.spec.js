import Ajv from 'ajv';
import { Validator } from './validator.js';

describe('lib: validator', () => {

    const instance = new Ajv();
    const validator = new Validator(instance);

    test('should validate proper schema with valid data', () => {
        const schema = {
            type: 'object',
            required: ['dummy'],
            properties: {
                dummy: {
                    type: 'string'
                }
            }
        };
        const data = {
            dummy: 'string'
        };
        expect(() => validator.validate(schema, data)).not.toThrow();
    });

    test('should throw exception on invalid data', () => {
        const schema = {
            type: 'object',
            required: ['dummy'],
            properties: {
                dummy: {
                    type: 'string'
                }
            }
        };
        const data = {
            dummy: 1
        };
        expect(() => validator.validate(schema, data)).toThrow();
    });

});