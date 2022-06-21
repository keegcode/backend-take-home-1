import { request } from 'undici';
import utils from '../utils/index.js';
import AuthProvider from '../lib/auth.provider.js';
import knex from 'knex';
import knexFile from '../knexfile.js';
import pino from 'pino';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Validator } from './validator.js';

const ajv = new Ajv();

addFormats(ajv);

const db = knex(knexFile);
const logger = pino();
const validator = new Validator(ajv);

const dependencies = {
    db: db,
    logger,
    validator,
    request: request,
    utils
};

dependencies.auth = AuthProvider.bind(dependencies)();

export default dependencies;