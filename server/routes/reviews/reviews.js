import express from 'express';
import db from '../../db.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = express.Router();

// Get Requests

router.get('/my-reviews', authenticateToken, async(req, res) => {
    try {
        const { rows } = await db.query (
            'SELECT * FROM reviews WHERE user_id = $1',
            [req.user.id]
        );
        res.json(rows);
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: err.message });
    }
});


export default router;