/* eslint-disable no-console */
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { createExpressServer } from 'routing-controllers';

const API_PORT = process.env.API_PORT || 3001;

const app = createExpressServer({
    controllers: [`${__dirname}/controllers/*`],
    cors: { preflightContinue: false },
});

// connect to db
console.log('🔌 Connecting to database...');
createConnection()
    .then(async (connection) => {
        console.log('⚡ Connected to database.');
        await connection.dropDatabase();
        await connection.synchronize();
        await connection.runMigrations();
        console.log('🗃️ Schema synchronized; migrations run.');

        app.listen(API_PORT);
        console.log(`🚀 Server listening on port ${API_PORT}.`);
    })
    .catch((err) => console.error(err));
