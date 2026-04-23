import express from 'express';
import cors from 'cors';
import db from '../../db.js';

const router = express.Router();


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


export default router;