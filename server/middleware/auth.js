import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  //console.log("Auth Header:", authHeader); // LOG 1

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
        //console.log("JWT Verify Error:", err.message); // LOG 2
        return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};