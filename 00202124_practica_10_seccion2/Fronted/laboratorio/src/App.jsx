// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import CustomerList from "./components/CustomerList";
import SalesForm from "./components/SalesForm";
import SalesList from "./components/SalesList";
import SalesReport from "./components/SalesReport";

const App = () => (
  <Router>
    <Routes>
      {/* Redirigir raíz a login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas (requieren token) */}
      <Route path="/clientes" element={<CustomerList />} />
      <Route path="/ventas" element={<SalesList />} />
      <Route path="/ventas/nueva" element={<SalesForm />} />
      <Route path="/ventas/reporte" element={<SalesReport />} />
    </Routes>
  </Router>
);

export default App;