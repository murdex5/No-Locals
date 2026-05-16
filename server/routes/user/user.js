import db from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const router = express.Router();


router.get('/:username', async (req, res) => {
    const { username } = req.params;
    const sql = 'SELECT * FROM users WHERE username = $1';
    
    try {
        const { rows } = await db.query(sql, [username]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found"});
        }
        res.json(rows[0]);
    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
});


// Register

router.post('/register', async (req, res) => {

    const {username, email, full_name, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
        INSERT INTO public.users (username, email, full_name, password, role, is_active)
        VALUES ($1, $2, $3, $4, 'user', true) 
        RETURNING id
        `;
        const { rows } = await db.query(sql, [username, email, full_name, hashedPassword]);

        res.status(201).json({ message: 'User created', id: rows[0].id});
    } catch (err) {
        console.error("Registration Error:", err.message);
        if (err.code === '23505') {
            return res.status(400).json({ error: 'Username or Email already taken'});
        }
        res.status(500).json({ error: err.message });
    }
});


// Login

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        if (rows.length == 0) return res.status(401).json({ error: 'Invalid credentials'});

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials'});

        const token = jwt.sign(
            { uid: user.uid, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        );
        res.json({ token, username: user.username, uid: user.uid });
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

export default router;