import express from 'express';
import db from '../../db.js';
import { authenticateToken } from '../../middleware/auth.js';
import multer from 'multer';
import dotenv from 'dotenv';
import ImageKit from 'imagekit';

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadToImageKit = async (fileBuffer, filename) => {
    try {
        const response = await imagekit.upload({
            file: fileBuffer,      
            fileName: filename,     
        });

        return response.url;

    } catch (error) {
       
        console.error("ImageKit Upload Error:", error);
        throw error; 
    }
};


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
            'SELECT * FROM businesses WHERE owner_id = $1',
            [req.user.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post Requests

router.post('/', authenticateToken, upload.single('image'), async (req, res) => {

    const { name, category, location, rating, description, is_local_friendly } = req.body;
    let image_url = null; 

    if (req.file) {
        try {
            image_url = await uploadToImageKit(
                req.file.buffer,
                req.file.originalname
            );
        } catch (err) {
            return res.status(500).json({
                error: 'Image upload failed',
                details: err.message
            });
        }
    }

    const owner_id = req.user.id;
    
   // console.log('Extracted values:', { name, category, location, rating, description, is_local_friendly, owner_id, image_url });

    try {
        const sql = `
            INSERT INTO businesses (
                name, category, location, rating, image_url, description, owner_id, is_local_friendly
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        
        const values = [
            name, 
            category, 
            location, 
            rating || 0, 
            image_url, 
            description, 
            owner_id, 
            is_local_friendly || false 
        ];

        const { rows } = await db.query(sql, values);
        res.status(201).json(rows[0]);

    } catch (err) {
        console.error('❌ CATCH BLOCK - Full error object:', err);
        console.error('Error message:', err.message);
        console.error('Error code:', err.code);
        console.error('Error detail:', err.detail);
        
        res.status(500).json({ 
            error: err.message,
            detail: err.detail,
            code: err.code
        });
    }
});


// Delete

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const { result } = await db.query('DELETE FROM businesses WHERE id = $1', [id]);

        if (result.rowCount == 0) {
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
        res.json(rows);
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