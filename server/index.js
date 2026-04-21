import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Allow the Vue app to talk to this server
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: "Backend is alive!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});