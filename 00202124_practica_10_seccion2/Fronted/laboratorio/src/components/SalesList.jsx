import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

function SalesList() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await api.get('/sales');
                setSales(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar la lista de ventas: ' + err.message);
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    if (loading) {
        return <p>Cargando ventas...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="customer-list-container">
            <h2>Lista de Ventas</h2>
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>ID Venta</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th>Nombre del Cliente</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>${parseFloat(sale.amount).toFixed(2)}</td>
                            <td>{formatDate(sale.created_at)}</td>
                            <td>{sale.customer_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesList;