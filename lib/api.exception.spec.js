import { ApiException } from './api.exception.js';

describe('lib: api-exception', () => {

    test('should create internal server error exception by default', () => {
        const exception = new ApiException();
        expect(exception.code).toBe('E_INTERNAL_SERVER_ERROR');
        expect(exception.message).toBe('Internal Server Error');
        expect(exception.statusCode).toBe(500);
    });

});