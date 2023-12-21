import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from "../../components/Modal";
import ModifImage from './ModifImages';
import CategorieEditForm from './CategorieEditForm';
import LoadingSpinner from '../../components/LoadingSpinner';

function TableCategorie() {
	const [categories, setCategories] = useState([]);
	const [form, setForm] = useState(<ModifImage />);
	const [loading, setLoading] = useState(true);
	const [visible, setVisible] = useState(false);
	const [formKey, setFormKey] = useState(10);

	const handleEdit = (id) => {
		setForm(<CategorieEditForm product={id} parentCallback={handleCallback} />);
		setVisible(true);
	};

	const handleDelete = (id) => {
		axios.delete(`http://localhost:8000/category/${id}`)
			.then((response) => {
				console.log(`Categorie ${id} deleted successfully`);
				// Mettre à jour l'état local après la suppression
				setCategories(prevCategories => prevCategories.filter(categorie => categorie.id !== id));
			})
			.catch((error) => {
				console.log(`Error deleting categorie ${id}:`, error);
			});
	};

	const handleCallback = (data) => {
		setVisible(data);
		setFormKey(formKey + 1);
	};

	const handleModifImages = (productId) => {
		setForm(<ModifImage productId={productId} parentCallback={handleCallback} />);
		setFormKey(formKey + 1);
		setVisible(true);
	};

	useEffect(() => {
		axios.get("http://localhost:8000/categories?limit=99999999999999")
			.then((response) => {
				const categoriesArray = [response.data[0]];
				setCategories(response.data);
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
				<LoadingSpinner />
			) : (
				<div className="overflow-x-auto">
					<Modal key={formKey} parentCallback={handleCallback} open={visible} form={form} title="Connexion" />

					<table className="table table-zebra">
						<thead className="bg-accent-content text-white">
							<tr>
								<th>Images</th>
								<th>Nom</th>
								<th>Parent</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{categories.map((category) => (
								<tr key={category.id}>
									<td>
										<button onClick={() => handleModifImages(category.id)}>Modifier images</button>
									</td>
									<td>{category.name}</td>
									<td>{category.parent && category.parent.name || ''}</td>
									<td>
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={() => handleEdit(category.id)}
                                        >
                                            Modifier
                                        </button>

                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleDelete(category.id)}
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

export default TableCategorie;