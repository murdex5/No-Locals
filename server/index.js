import express from 'express';
import cors from 'cors';

import businessesRoutes from './routes/business/businesses.js';
import userRoutes from './routes/user/user.js'
import reviewRoutes from './routes/reviews/reviews.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: "Test route is working" });
});

app.get('/', (req, res) => {
  res.json({ message: "Server is online"});
})

// // Routes

app.use('/users', userRoutes);
app.use('/businesses', businessesRoutes);
app.use('/reviews', reviewRoutes);


export default app;