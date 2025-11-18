import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function SalesReport() {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await api.get('/sales/report');
                setReportData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar el reporte: ' + err.message);
                setLoading(false);
            }
        };

        fetchReport();
    }, []);

    if (loading) {
        return <p>Cargando reporte de ventas...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="customer-list-container">
            <h2 className="content-center">Reporte de Ventas por Cliente</h2>
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Total Ventas</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.name}</td>
                            <td>${parseFloat(row.total_sales).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesReport;