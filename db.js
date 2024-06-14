require('dotenv').config();


const initOptions = {
    // global event notification;
    error(error, e) {
        if (e.cn) {
            // A connection-related error;
            //
            // Connections are reported back with the password hashed,
            // for safe errors logging, without exposing passwords.
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message || error);
        }
    }
};

const connection = {
    host: process.env.DBHOST || 'localhost',
    port: process.env.DBPORT || 5432,
    database: process.env.DBNAME,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    connectionString: process.env.DBSTR
}

const str = `postgres://${connection.user}:${connection.password}@localhost:5432/${connection.database}`;

const pgp = require('pg-promise')(initOptions)

// Configura la conexión a tu base de datos PostgreSQL
const db = pgp({
    connectionString: str,
});

module.exports = db;
