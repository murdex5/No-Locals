import dotenv from 'dotenv';
import express from 'express';
import db from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


dotenv.config();

const router = express.Router();

// router.get('/:username', async (req, res) => {
//     const { username } = req.params;
//     const sql = "SELECT * FROM users WHERE username = ?";

//     try {
//         const [rows] = await db.query(sql, [username]);

//         if (rows.length === 0) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.json(rows[0]);
//     } catch (err) {
//         // Remove conlose log later
//         console.error("Database Error:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


// Register 
router.post('/register', async (req, res) => {
    const {username, email, full_name, password} = req.body;
    console.log('body:', req.body);  
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query (
            'INSERT INTO users (username, email, full_name, password) VALUES (?, ?, ?, ?)',
            [username, email, full_name, hashedPassword]
        );
        res.status(201).json({ message: 'User created', id: result.insertId});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})

// Login

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) return res.status(401).json({ error: 'Inavalid credentials'});

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);

        if(!match) return res.status(401).json({ error: 'Invalid credentials'});

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.json({ token, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

export default router;