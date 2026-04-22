import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

const db = mysql.createPool({
  host:'localhost',
  user: 'no_locals',
  password: process.env.DB_PASSWORD,
  database: 'no_locals_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: "Server is online!" });
});


app.get('/businesses', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM businesses');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));