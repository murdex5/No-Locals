import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
  // console.log("🔍 AUTH MIDDLEWARE - Headers:", req.headers);
  const authHeader = req.headers['authorization'];
  // console.log("🔍 AUTH MIDDLEWARE - Auth Header:", authHeader);

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    // console.log("🔍 AUTH MIDDLEWARE - No token found");
    return res.status(401).json({ error: "Access denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // console.log("🔍 AUTH MIDDLEWARE - JWT Error:", err.message);
      return res.status(403).json({ error: "Invalid token" });
    }
    // console.log("🔍 AUTH MIDDLEWARE - User verified:", user);
    req.user = user;
    next();
  });
};