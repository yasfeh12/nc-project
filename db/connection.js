const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
    path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && ENV !== 'production') {
    throw new Error('PGDATABASE not set');
}

const config = {};

if (ENV === 'production') {
    config.connectionString = process.env.DATABASE_URL;
    config.ssl = {
        rejectUnauthorized: false,
    };
} else {
    config.database = process.env.PGDATABASE;
}

module.exports = new Pool(config);

