const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set');
}
const dbConfig = {
  database: process.env.PGDATABASE,
  port: process.env.PGPORT || 5432,
};
module.exports = new Pool();
