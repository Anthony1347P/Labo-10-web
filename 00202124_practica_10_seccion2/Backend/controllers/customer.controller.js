import { pool } from "../data/database.js";

export const getCustomers = (req, res) => {
  pool.query('SELECT * FROM customers ORDER BY id ASC', (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result.rows);
  });
};

export const getCustomerByCode = (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ message: "El parámetro 'code' es obligatorio" });
  }

  pool.query('SELECT * FROM customers WHERE TRIM(code) = TRIM($1)', [code], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(result.rows[0]);
  });
};