import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from "../../components/Modal";
import ModifImage from './ModifImages';
import ProductEditForm from './ProductEditForm';

function TableProducts() {
    const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [formKey, setFormKey] = useState(10);
    const [form, setForm] = useState(<ProductEditForm />);

    const handleEdit = (id) => {
        setForm(<ProductEditForm product={id} parentCallback={handleCallback} />);
        setVisible(true);
    };

    const handleDelete = (id) => {
        console.log(`Delete product ${id}`);
    };

    const handleCallback = (data) => {
        setVisible(data);
        setFormKey(formKey + 1);
    };

    const handleModifImages = (productId) => {
        setForm(<ModifImage productId={productId} parentCallback={handleCallback} />);
        setFormKey(formKey + 1);
        setVisible(true);
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/products?limit=99999999999999')
            .then((response) => {
                const productsArray = [response.data[0]];
                setproducts(response.data);
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
						title="Modifier le produit"
					/>
                    
                    <table className="table table-zebra">
                        <thead className="bg-accent-content text-white">
                            <tr>
                                <th>Images</th>
                                <th>Nom</th>
                                <th>Description</th>
                                <th>Quantité</th>
                                <th>Prix</th>   
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(products) && products.map((product, i) => (
                                <tr key={i}>
                                    <td>
                                        <button onClick={() => handleModifImages(product.id)}>Edit Images</button>
                                    </td>                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={() => handleEdit(product.id)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
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
