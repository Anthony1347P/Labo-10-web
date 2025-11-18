import { pool } from "../data/database.js";
import jwt from "jsonwebtoken";
import { generateHash, compareHash } from "../hash/hash.js";
import { JWT_SECRET } from "../keys/secrets.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Nombre, email y contraseña son obligatorios" });
  }

  try {
    const hash = await generateHash(password);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hash]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ message: "Email ya registrado" });
    }
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña requeridos" });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = result.rows[0];
    const valido = await compareHash(password, user.password);
    if (!valido) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};