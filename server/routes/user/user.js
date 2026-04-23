import express from 'express';
import db from '../../db.js';

const router = express.Router();

router.get('/:username', async (req, res) => {
    const { username } = req.params;
    const sql = "SELECT * FROM users WHERE username = ?";

    try {
        const [rows] = await db.query(sql, [username]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(rows[0]);
    } catch (err) {
        // Remove conlose log later
        console.error("Database Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;