import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;

dotenv.config();

const db = new Pool({
    host: process.env.POSTGRESS_HOST || 'localhost',
    port: process.env.POSTGRESS_PORT,
    user: process.env.POSTGRESS_USERNAME,
    password: process.env.POSTGRESS_PASSWORD,
    database: process.env.POSTGRESS_DATABASE,
});

db.connect((err, _client, _release) => {
    if (err) {
        return console.error("Error aquring client", err.stack);
    }
    console.log('Successfully connected to postgress server');
});

export default db;