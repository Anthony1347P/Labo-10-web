import React, { useState } from 'react';
import API from '../utils/api';

function SalesForm() {
    const [amount, setAmount] = useState('');
    const [idCustomer, setIdCustomer] = useState('');

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);

        const parsedAmount = parseFloat(amount);
        const parsedId = parseInt(idCustomer);

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setError("El monto debe ser un número positivo.");
            return;
        }

        if (isNaN(parsedId) || parsedId <= 0) {
            setError("El ID del Cliente debe ser un número positivo.");
            return;
        }

        try {
            const saleData = {
                amount: parsedAmount,
                id_customer: parsedId
            };

            const response = await API.post('/sales', saleData);

            setSuccess(`¡Venta registrada con éxito! ID de la venta: ${response.data.id}`);
            setAmount('');
            setIdCustomer('');

        } catch (err) {
            setError(err.response?.data?.message || "Error al registrar la venta.");
        }
    };

    return (
        <div className="login-container" style={{ height: 'auto', paddingTop: '2rem' }}>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Registrar Nueva Venta</h2>

                <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Monto (ej: 100.50)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    pattern="[0-9]*\.?[0-9]+"
                />

                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="ID del Cliente (ej: 1)"
                    value={idCustomer}
                    onChange={(e) => setIdCustomer(e.target.value)}
                    required
                    pattern="[0-9]+"
                />

                <button type="submit">Registrar Venta</button>

                {success && <p className="form-success">{success}</p>}
                {error && <p className="form-error">{error}</p>}

            </form>
        </div>
    );
}

export default SalesForm;