import { pool } from "../data/database.js";

export const createSale = async (req, res) => {
  const { amount, id_customer } = req.body;
  if (!amount || !id_customer) {
    return res.status(400).json({ message: "Monto y ID de cliente son requeridos" });
  }

  try {
    const cliente = await pool.query('SELECT id FROM customers WHERE id = $1', [id_customer]);
    if (cliente.rows.length === 0) {
      return res.status(404).json({ message: "Cliente no existe" });
    }

    const result = await pool.query(
      'INSERT INTO sales (amount, id_customer, created_at) VALUES ($1, $2, NOW()) RETURNING *',
      [amount, id_customer]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al registrar venta" });
  }
};

export const getSales = (req, res) => {
  const query = `
    SELECT s.id, s.amount, s.created_at, c.name AS customer_name
    FROM sales s
    JOIN customers c ON s.id_customer = c.id
    ORDER BY s.created_at DESC
  `;
  pool.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result.rows);
  });
};

export const getSalesReport = (req, res) => {
  const query = `
    SELECT c.name, SUM(s.amount) AS total_sales
    FROM sales s
    JOIN customers c ON s.id_customer = c.id
    GROUP BY c.name
    ORDER BY total_sales DESC
  `;
  pool.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result.rows);
  });
};