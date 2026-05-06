import express from 'express';
import cors from 'cors';
import businessesRoutes from './routes/business/businesses.js';
import userRoutes from './routes/user/user.js';
import reviewRoutes from './routes/reviews/reviews.js';

const app = express();

// Middleware
app.use(cors()); /
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