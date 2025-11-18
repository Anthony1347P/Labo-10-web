import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./keys/secrets.js";

// Rutas
import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import salesRoutes from "./routes/sales.routes.js";

const app = express();

// Middlewares globales
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "API de práctica 10 - ✅ Funcionando" });
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales", salesRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
