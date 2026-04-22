import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DATABASE,
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

app.get('/business/:id', async (req, res) => {
  const businessId = req.params.id;
  const sql = "SELECT * FROM businesses WHERE id = ?";

  try {
    const [rows] = await db.query(sql, [businessId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Business not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(3000, () => console.log('Backend running on http://localhost:3000'));