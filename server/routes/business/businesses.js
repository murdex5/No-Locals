import express from 'express';
import cors from 'cors';
import db from '../../db.js';

const router = express.Router();

// Get Requests
router.get('/', async (req, res) => {
    try {
    const [rows] = await db.query('SELECT * FROM businesses');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

router.get('/:id', async (req, res) => {
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

// Post

router.post('/', async (req, res) => {
  const { name, category, location, rating, image_url, description } = req.body;
  try {
    const sql = 'INSERT INTO businesses (name, category, location, rating, image_url, description) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await db.query(sql, [name, category, location, rating, image_url, description]);
    res.status(201).json({ id: result.insertId, name, category });
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;