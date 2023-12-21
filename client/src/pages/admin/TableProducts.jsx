import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import ModifImage from "./ModifImages";
import ProductEditForm from "./ProductEditForm";
import ProductAddForm from "./ProductAddForm";
import LoadingSpinner from '../../components/LoadingSpinner';

function TableProducts() {
	const [products, setproducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [visible, setVisible] = useState(false);
	const [formKey, setFormKey] = useState(10);
	const [form, setForm] = useState(<ProductEditForm />);
	const [searchTerm, setSearchTerm] = useState("");

	const handleAdd = () => {
		setForm(<ProductAddForm parentCallback={handleCallback} />);
		setVisible(true);
	};

	const handleEdit = (id) => {
		setForm(<ProductEditForm product={id} parentCallback={handleCallback} />);
		setVisible(true);
	};

	const handleDelete = (id) => {
		axios
			.delete(`http://localhost:8000/product/${id}`)
			.then((response) => {
				console.log(`Product ${id} deleted successfully`);
				// Mettre à jour l'état local après la suppression
				setproducts((prevProducts) =>
					prevProducts.filter((product) => product.id !== id)
				);
			})
			.catch((error) => {
				console.log(`Error deleting product ${id}:`, error);
			});
	};

	const handleCallback = (data) => {
		setVisible(data);
		setFormKey(formKey + 1);

	};

	const handleModifImages = (productId) => {
		setForm(
			<ModifImage typeId={productId} dataType="product" parentCallback={handleCallback} />
		);
		setFormKey(formKey + 1);
		setVisible(true);
	};

	useEffect(() => {
		axios
			.get("http://localhost:8000/products?limit=99999999999999")
			.then((response) => {
				const productsArray = [response.data[0]];
				setproducts(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [visible]);

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
						title="Modifier le produit"
					/>

					<div className="vert py-0 px-4 flex justify-between items-center font-bold text-xs">
						<div className="navbar-start flex items-center">
							<input
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="p-2 border border-gray-300 rounded-md"
								placeholder="Rechercher..."
							/>
						</div>
						<label className="navbar-center text-base text-white">Liste des produits</label>
						<div className="navbar-end flex items-center">
							<button
								className="bg-accent-content text-white px-4 py-2 rounded"
								onClick={() => {
									handleAdd();
								}}>
								Ajouter un produit
							</button>
						</div>
					</div>
					<table className="table table-zebra">
						<thead className="vert text-white">
							<tr>
								<th>Nom</th>
								<th>Description</th>
								<th>Catégories</th>
								<th>Quantité</th>
								<th>Prix</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{Array.isArray(products) &&
								products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product, i) => (
									<tr key={i}>
										<td>{product.name}</td>
										<td>{product.description}</td>
										<td>{product.category.name}</td>
										<td>{product.quantity}</td>
										<td>{product.price}</td>
										<td className="flex gap-2">
											<button
												className="bg-blue-500 text-white px-2 py-1 rounded"
												onClick={() => handleEdit(product.id)}
											>
												Modifier
											</button>

											<button
												className="bg-red-500 text-white px-2 py-1 rounded"
												onClick={() => handleDelete(product.id)}
											>
												Effacer
											</button>

											<button
												className="bg-green-500 text-white px-2 py-1 rounded"
												onClick={() => handleModifImages(product.id)}
											>
												Modifier images
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

export default TableProducts;
