import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserEditForm from './UserEditForm';
import Modal from "../../components/Modal";

function TableUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [formKey, setFormKey] = useState(10);
    const [form, setForm] = useState(<UserEditForm />);

    const handleEdit = (id) => {
        setForm(<UserEditForm user={id} parentCallback={handleCallback} />);
        setVisible(true);
    };

	const handleDelete = (id) => {
		axios.delete(`http://localhost:8000/user/${id}`)
			.then((response) => {
				console.log(`User ${id} deleted successfully`);
				// Mettre à jour l'état local après la suppression
				setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
			})
			.catch((error) => {
				// Handle error
				console.log(error);
			});
	};

	const handleCallback = (data) => {
		setVisible(data);
		setFormKey(formKey + 1);
	};

    useEffect(() => {
        axios.get('http://localhost:8000/users')
            .then((response) => {
                setUsers(response.data);
                setLoading(false); // Mettre le chargement à false une fois les données chargées
            })
            .catch((error) => {
                console.log(error);
                setLoading(false); // Mettre le chargement à false en cas d'erreur
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
						title="Modifier l'utilisateur"
					/>

                    <table className="table table-zebra">
                        <thead className="bg-accent-content text-white">
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Téléphone</th>
                                <th>Email</th>
                                <th>Adresse</th>
                                <th>Pays</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={i}>
                                    <td>{user.lastName}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.country}</td>
                                    <td className='flex gap-2'>
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleEdit(user.id)}
                                        >
                                            Modifier
                                        </button>

										<button
											className="bg-red-500 text-white px-2 py-1 rounded"
											onClick={() => handleDelete(user.id)}
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

export default TableUsers;
