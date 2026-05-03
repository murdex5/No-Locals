import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import businessesRoutes from './routes/business/businesses.js';
import userRoutes from './routes/user/user.js'
import reviewRoutes from './routes/reviews/reviews.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.json({ message: "Test route is working" });
});

// app.get('/', (req, res) => {
//   res.json({ message: "Server is online"});
// })

// // Routes

app.use((req, res, next) => {
  // console.log(`📨 ${req.method} ${req.path}`);
  // console.log('Content-Type:', req.headers['content-type']);
  // console.log('Body:', req.body);
  next();
});


app.use('/users', userRoutes);
app.use('/businesses', businessesRoutes);
app.use('/reviews', reviewRoutes);


app.use(express.static(path.join(__dirname, '../client/dist')));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


app.use((err, req, res, _next) => {
  console.error('🚨 GLOBAL ERROR HANDLER:', err);
  res.status(500).json({ error: err.message });
});

export default app;