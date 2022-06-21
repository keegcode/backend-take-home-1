import { ValidationFailedException } from './api.exceptions.js';

export class Validator {
    #instance;
    constructor(instance) {
        this.#instance = instance;
    }
    validate(schema, data) {
        const validate = this.#instance.compile(schema);
        const valid = validate(data);
        if (!valid) throw new ValidationFailedException(validate.errors);
    }
}