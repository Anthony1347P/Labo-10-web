import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../keys/secrets.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No autorizado: falta el token" });
  }

  const token = authHeader.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ message: "Token no válido" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" });
    }
    req.user = user;
    next();
  });
};