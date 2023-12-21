import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from "../../components/Modal";
import OrderEditForm from './OrderEditForm'; // Assurez-vous d'importer correctement votre composant

function TableOrders() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [visible, setVisible] = useState(false);
	const [formKey, setFormKey] = useState(10);
	const [form, setForm] = useState(<OrderEditForm />);

	const handleEdit = (id) => {
		setForm(<OrderEditForm order={id} parentCallback={handleCallback} />);
		setVisible(true);
	};

	const handleDelete = (id) => {
		axios.delete(`http://127.0.0.1:8000/order/${id}`)
			.then((response) => {
				console.log(`Order ${id} deleted successfully`);
				// Mettre à jour l'état local après la suppression
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
		axios.get('http://127.0.0.1:8000/orders')
			.then((response) => {
				setOrders(response.data.map(order => order[0]));
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	return (
		<>
			{loading ? (
				<p>Chargement en cours...</p>
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
						<thead className="bg-accent-content text-white">
							<tr>
								<th>Client</th>
								<th>Téléphone</th>
								<th>Email</th>
								<th>Adresse</th>
								<th>Pays</th>
								<th>Date</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order, i) => (
								<tr key={i}>
									<td>{order.client.lastName} {order.client.firstName}</td>
									<td>{order.client.phone}</td>
									<td>{order.client.email}</td>
									<td>{order.client.address}</td>
									<td>{order.client.country}</td>
									<td>{new Date(order.date).toLocaleDateString('fr-FR')}</td>

									<td>
										<button
											className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
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
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}

export default TableOrders;
