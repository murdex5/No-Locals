import express from 'express';
import cors from 'cors';

import businessesRoutes from './routes/business/businesses.js';
import userRoutes from './routes/user/user.js'

const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: "Server is online!" });
});

// Routes
app.use('/businesses', businessesRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));