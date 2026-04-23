import express from 'express';
import cors from 'cors';

import businessesRoutes from './routes/business/businesses.js';
import userRoutes from './routes/user/user.js'

const app = express();

app.use(cors());
app.use(express.json());  // ← must be before routes

app.get('/test', (req, res) => {
  res.json({ message: "Server is online!" });
});

// Routes
app.use('/businesses', businessesRoutes);
app.use('/users', userRoutes);

export default app;