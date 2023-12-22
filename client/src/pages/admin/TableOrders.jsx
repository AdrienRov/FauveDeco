import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from "../../components/Modal";
import OrderEditForm from './OrderEditForm'; // Assurez-vous d'importer correctement votre composant
import OrderSendInvoice from './OrderSendInvoice';
import LoadingSpinner from '../../components/LoadingSpinner';

function TableOrders() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [visible, setVisible] = useState(false);
	const [formKey, setFormKey] = useState(10);
	const [form, setForm] = useState(<OrderEditForm />);

	const [shownOrder, setShownOrder] = useState(null);

	const handleEdit = (id) => {
		setForm(<OrderEditForm order={id} parentCallback={handleCallback} />);
		setVisible(true);
	};

    const handleSendInvoice = (order) => {
        setForm(<OrderSendInvoice order={order} parentCallback={handleCallback} />);
		setVisible(true);
    };

	const handleDelete = (id) => {
		axios.delete(`http://localhost:8000/order/${id}`)
			.then((response) => {
				console.log(`Order ${id} deleted successfully`);
				setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
			})
			.catch((error) => {
				console.log(`Error deleting order ${id}:`, error);
			});
	};


	const handleCallback = (data) => {
		setVisible(data);
		setFormKey(formKey + 1);
	};

	useEffect(() => {
		axios.get('http://localhost:8000/orders?limit=99999999999999&order=desc')
			.then((response) => {
				setOrders(response.data.map(order => order[0]));
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [visible]);

	const status = {
		0: "En attente",
        1: "Attente de paiement",
		2: "En préparation",
		3: "Prêt",
		4: "Terminé",
		5: "Annulé"
	};

    const fixPrice = (price) => {
        if (isNaN(price)) {
            return price;
        }
        if (typeof price === 'string') {
            price = parseFloat(price);
        }
        return price.toFixed(2);
    }

	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<div className="overflow-x-auto">
					<Modal
						key={formKey}
						parentCallback={handleCallback}
						open={visible}
						form={form}
						title="Modifier la commande"
					/>

					<table className="table table-zebra">
						<thead className="vert bg-accent-content text-white">
							<tr>
								<th>Client</th>
								<th>Type</th>
								<th>Status</th>
								<th>Adresse</th>
                                <th>Total</th>
								<th>Date</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order, i) => (<>
								<tr key={i}>
									<td>{order.client.lastName} {order.client.firstName}</td>
									<td>{order.type == 1 ? "Livraison" : "Click and Collect"}</td>
									<td>
                                        {status[order.status]}
                                        {order.status == 0 && (
                                            <button
                                                className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                                                onClick={() => handleSendInvoice(order)}
                                            >
                                                Envoyer facture
                                            </button>
                                        )}
                                    </td>
									<td>{order.client.address}, {order.client.country}</td>
                                    <td>{fixPrice(order.total)} €</td>
									<td>{new Date(order.date).toLocaleDateString('fr-FR')}</td>

									<td className='flex gap-2'>
										<button
											className="bg-green-500 text-white px-2 py-1 rounded mr-2"
											onClick={() => setShownOrder(shownOrder !== order.id ? order.id : null)}
										>
											{shownOrder === order.id ? "Cacher" : "Voire"}
										</button>
										<button
											className="bg-blue-500 text-white px-2 py-1 rounded2"
											onClick={() => handleEdit(order.id)}
										>
											Modifier
										</button>
										<button
											className="bg-red-500 text-white px-2 py-1 rounded"
											onClick={() => handleDelete(order.id)}
										>
											Effacer
										</button>
									</td>
								</tr>
								{
									shownOrder === order.id && (
										<tr>
											<td colSpan="7">
												<table className="table table-zebra">
													<thead className="bg-accent-content text-white">
														<tr>
															<th>Produit</th>
															<th>Quantité</th>
															<th>Prix</th>
														</tr>
													</thead>
													<tbody>
														{order.productOrders.map((productOrder, i) => (
															<tr key={i}>
																<td>{productOrder.product.name}</td>
																<td>{productOrder.quantity}</td>
																<td>{fixPrice(productOrder.product.price)} €</td>
															</tr>
														))}
													</tbody>
												</table>
											</td>
										</tr>
									)
								}
							</>))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}

export default TableOrders;
