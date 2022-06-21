export class ApiException {
    statusCode;
    code;
    message;
    constructor({
        statusCode = 500,
        code = 'E_INTERNAL_SERVER_ERROR',
        message = 'Internal Server Error'
    } = {}) {
        this.statusCode = statusCode;
        this.code = code;
        this.message = message;
    }
}