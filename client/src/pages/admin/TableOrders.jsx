import axios from 'axios';
import React, { useEffect, useState } from 'react';

function TableOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/orders')
            .then((response) => {
                const ordersArray = [response.data[0][0]];
                setOrders(ordersArray);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead className="bg-accent-content text-white">
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Téléphone</th>
                            <th>Email</th>
                            <th>Adresse</th>
                            <th>Pays</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(orders) && orders.map((order, i) => (
                            <tr key={i}>
                                <td>{order.client.lastName}</td>
                                <td>{order.client.firstName}</td>
                                <td>{order.client.phone}</td>
                                <td>{order.client.email}</td>
                                <td>{order.client.address}</td>
                                <td>{order.client.country}</td>
                                <td>{new Date(order.date).toLocaleDateString('fr-FR')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TableOrders;
