import { ApiException } from './api.exception.js';

export class UnauthorizedException extends ApiException {
    constructor() {
        super({ statusCode: 401, code: 'E_UNAUTHORIZED', message: 'Unauthorized!' });
    }
}

export class InvalidCredentialsException extends ApiException {
    constructor() {
        super({ statusCode: 401, code: 'E_INVALID_CREDENTIALS', message: 'E-Mail or Password is incorrect!' });
    }
}

export class ValidationFailedException extends ApiException {
    constructor(message) {
        super({ statusCode: 400, code: 'E_VALIDATION_FAILED', message });
    }
}