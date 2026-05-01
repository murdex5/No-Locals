import express from 'express';
import db from '../../db.js';
import { authenticateToken } from '../../middleware/auth.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_name,
    api_key: process.env.CLOUDINARY_api,
    api_secret: process.env.CLOUDINARY_secret
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: { folder: 'no-locals' },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const {rows} = await db.query('select * from public.businesses');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

router.get('/:id', async (req, res) => {
    const businessId = req.params.id;
    const sql = 'SELECT * FROM businesses WHERE id = $1';

    try {
        const { rows } = await db.query(sql, [businessId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Business not found'});
        }
        res.json(rows[0]);
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

router.get('/my-businesses', authenticateToken, async (req, res) => {
    try {
        const { rows } = await db.query( 
            'SELECT * FROM businesses owner_id = $1',
            [req.user.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post Requests

router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
    
    const image_url = req.file ? req.file.path: null;

    const {name,  category, location, rating, description} = req.body;
    
    const owner_id = req.user.id;

    try {
        const sql = `
        INSERT INTO businesses (name, category, location, rating, image_url, description, owner_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `;
        const { rows } = await db.query(sql, [name, category, location, rating, image_url, description, owner_id]);

        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('DB Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});


// Delete

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const { result } = await db.query('DELETE FROM businesses WHERE id = $1', [id]);

        if (result.affectedRows == 0) {
            return res.status(404).json({ error: 'Business not found'});
        }
        res.status(200).json({ message: 'Business deleted successfully'});
    } catch (err) {
        console.error('DB Error:', err.message);
        res.status(500).json({ error: err.message});
    }
});

// Business Reviews

router.get('/:id/reviews', async (req, res) => {
    const business_id = req.params.id;
    const sql = 'SELECT * FROM reviews WHERE business_id = $1 ORDER BY id DESC';
    try {
        const { rows } = await db.query(sql, [business_id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Business not found'});
        }
        res.json(rows[0]);
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});


// Reviews Posts
router.post('/:id/reviews', authenticateToken, async (req, res) => {
    const business_id = req.params.id;
    const user_id = req.user.id;

    const { content } = req.body || {};

    try {
        const sql = `
        INSERT INTO reviews (content, user_id, business_id, likes, dislikes)
        VALUES ($1, $2, $3, 0, 0) 
        RETURNING *`;
        const { rows } = await db.query(sql, [content, user_id, business_id]);

        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('DB Error:', err.message);
        res.status(500).json({ error: 'Failed to create review' });
    }

});

export default router;