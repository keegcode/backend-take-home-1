import 'dotenv/config';
import { ApiSchema } from './api.schema.js';
import express from 'express';
import bodyParser from 'body-parser';
import expressPino from 'express-pino-logger';
import cron from 'node-cron';
import { ApiException } from './api.exception.js';
import swaggerUi from 'swagger-ui-express';
import swagger from './swagger.js';

export class Api {
    #allowedMethods;
    #dependencies;
    #modules;
    #api;
    #buildStrategy;
    #port;
    #server;
    #tasks = [];
    #openapi;

    constructor({ modules = [], dependencies = {}, allowedMethods = [], port }) {
        this.#allowedMethods = new Set(allowedMethods);
        this.#dependencies = dependencies;
        this.#modules = modules;
        this.#buildStrategy = { 'http': this.#buildHttpRoute, 'cron': this.#buildCronRoute };
        this.#port = port;
        this.#api = express();
        this.#openapi = swagger;
        this.#init();
    }

    #init() {
        this.#api.use(bodyParser.urlencoded({ extended: false }));
        this.#api.use(bodyParser.json());
        this.#api.use(expressPino({ logger: this.#dependencies.logger }));
        this.#api.use('/api', swaggerUi.serve, swaggerUi.setup(this.#openapi));

        const routes = [];

        for (const { api } of this.#modules) {
            routes.push(...api);
        }

        for (const route of routes) {
            this.#buildRoute(route);
        }
    }

    #buildRoute(route) {
        const strategy = this.#buildStrategy[route.type];
        if (!strategy) {
            throw new Error(`Invalid type provided for building API: ${strategy}`);
        }
        return strategy.bind(this)(route);
    }

    #buildHttpRoute(route) {
        const { method, auth, schema, handler, path } = route;
        const { auth: authorization, validator, logger } = this.#dependencies;

        if (!this.#allowedMethods.has(route.method)) {
            throw new Error(`Wrong method provided: ${route.method}`);
        }

        this.#api[method.toLowerCase()](path, async (req, res) => {
            try {
                const payload = { body: req.body, params: req.params, query: req.query };

                if (auth) {
                    const header = req.header('Authorization');
                    await authorization.authenticate(header);
                }

                if (schema) {
                    validator.validate(ApiSchema(schema), payload);
                }

                const response = await handler.bind({ ...this.#dependencies, ...route }, payload)();
                res.json(response);
            } catch (error) {
                logger.error(error);
                const exception = error instanceof ApiException ? error : new ApiException();
                res.status(exception.statusCode).json(exception);
            }
        });
    }

    #buildCronRoute(route) {
        const { cron: pattern, logger, handler } = route;

        const task = cron.schedule(pattern, async () => {
            try {
                await handler.bind({ ...this.#dependencies, ...route })();
            } catch (error) {
                logger.error(error);
            }
        });

        this.#tasks.push(task);
    }

    start() {
        const { logger } = this.#dependencies;
        this.#server = this.#api.listen(this.#port, () => logger.info(`App is up and running on port: ${process.env.PORT}`));
    }

    async stop({ reason, error }) {
        if (!this.#server) {
            throw new Error('You must start API before closing it!');
        }
        this.#dependencies.logger.info(`Stopping server, reason: ${reason}`);
        if (error) {
            this.#dependencies.logger.error(error);
        }
        await new Promise((resolve) => this.#server.close(async () => {
            for (const task of this.#tasks) {
                task.stop();
            }
            const { db } = this.#dependencies;
            await db.destroy();
            resolve();
        }));
    }

    get server() {
        return this.#api;
    }
}