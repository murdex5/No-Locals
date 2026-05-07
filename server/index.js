import express from 'express';
import cors from 'cors';
import businessesRoutes from './routes/business/businesses.js';
import userRoutes from './routes/user/user.js';
import reviewRoutes from './routes/reviews/reviews.js';

const app = express();

// Middleware

const getAllowedOrigin = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.FRONTEND_URL || 'https://no-locals.onrender.com';
  }
  // Development: allow localhost
  return ['http://localhost:5173', 'http://localhost:3000'];
};

app.use(cors({
  origin: getAllowedOrigin(), 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check / Root
app.get('/', (req, res) => {
  res.json({ message: "No-Locals API is online" });
});

app.get('/test', (req, res) => {
  res.json({ message: "Test route is working" });
});

app.use('/users', userRoutes);
app.use('/businesses', businessesRoutes);
app.use('/reviews', reviewRoutes);

// Global Error Handler
app.use((err, req, res, _next) => {
  console.error('🚨 GLOBAL ERROR HANDLER:', err);
  res.status(500).json({ error: err.message });
});

export default app;