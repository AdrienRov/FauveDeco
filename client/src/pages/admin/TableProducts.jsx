import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from "../../components/Modal";
import ModifImage from './ModifImages';

function TableProducts() {
    const [products, setproducts] = useState([]);
    const [form, setForm] = useState(<ModifImage />);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [formKey, setFormKey] = useState(10);

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
        axios.get('http://127.0.0.1:8000/products')
            .then((response) => {
                const productsArray = [response.data[0]];
                setproducts(productsArray);
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
                    <Modal key={formKey} parentCallback={handleCallback} open={visible} form={form} title="Connexion" />

                    <table className="table table-zebra">
                        <thead className="bg-accent-content text-white">
                            <tr>
                                <th>Images</th>
                                <th>Nom</th>
                                <th>Description</th>
                                <th>Quantité</th>
                                <th>Prix</th>
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
