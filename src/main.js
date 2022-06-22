import { AuthModule } from './auth/auth.module.js';
import { CountriesModule } from './countries/countries.module.js';
import { Api } from '../lib/api.js';
import dependencies from '../lib/dependencies.js';

const modules = [
    AuthModule,
    CountriesModule
];

const api = new Api({
    modules,
    allowedMethods: ['POST', 'GET'],
    dependencies, port: process.env.PORT
});

api.start();

process.once('uncaughtException', async (error) => {
    await api.stop({ reason: 'uncaughtException', error });
    process.exit(1);
});

process.once('unhandledRejection', async (error) => {
    await api.stop({ reason: 'unhandledRejection', error });
    process.exit(1);
});

process.once('SIGINT', async () => {
    await api.stop({ reason: 'SIGINT' });
    process.exit(0);
});

process.once('SIGTERM', async () => {
    await api.stop({ reason: 'SIGTERM' });
    process.exit(0);
});