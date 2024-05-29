import { useEffect, useState } from 'react';

function DashboardAdminSales(){

    const [sales, setSales] = useState([]);
    async function getSales() {
        try {
            const response = await fetch(`http://localhost:4000/v1/restaurant/sales`);
            const responseData = await response.json();
            setSales(responseData);
        } catch (error) {
            console.error('Error cargando ventas:', error);
        }
    }

    useEffect(() => {
        getSales();
    }, []);

    return (
        <div className="dashboardAdminSales p-2">
            <h2>Ventas</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th width="30%">Mesero</th>
                        <th width="10%">Mesa</th>
                        <th width="50%">Pedido</th>
                        <th width="10%">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.filter(sale => sale.estado === "listo").map((sale, index) => (
                    <tr key={index}>
                        <td>{sale.mesero}</td>
                        <td>{sale.mesa}</td>
                        <td>
                            <ul>
                                {sale.productos.map((product, i) => (
                                    <li key={i}>
                                        {product.cantidad} - {product.producto}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>${sale.totalventa}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DashboardAdminSales;