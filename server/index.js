import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const db = mysql.createPool({
  host:'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'no_locals_db'
})

app.get('/test', (req, res) => {
  res.json({ message: "Hello from the No-Locals Server!" });
});

app.listen(3000, () => console.log('Backend running on port 3000'));

app.get('/api/businessses', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM businesses');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database connection failed"});
  }
});