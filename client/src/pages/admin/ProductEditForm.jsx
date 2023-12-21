import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function ProductEditForm(props) {
    const [editedProduct, setEditedProduct] = useState({});
	const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const { product } = props;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

	const handleCategorySelect = (selectedOption) => {
        setSelectedCategory(selectedOption);
    };

    const handleCategorySearch = (query) => {
        const filtered = categories.filter((category) =>
            `${category.name}`.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    useEffect(() => {
        if (!product) {
            return;
        }

        axios.get(`http://localhost:8000/product/${product}`).then((response) => {
            setEditedProduct(response.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });

        axios.get("http://localhost:8000/categories?limit=99999999999999").then((response) => {
            setCategories(response.data);
            setFilteredCategories(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [product]);

    // set selected category when both categories and editedProduct are loaded
    useEffect(() => {
        if (!categories.length || !editedProduct.category) {
            return;
        }

        const selected = categories.find((category) => category.id === editedProduct.category.id);
        setSelectedCategory(selected);
    }, [categories, editedProduct]);

    

    const onTrigger = (event) => {

        const url = `http://localhost:8000/product/${product}`; 
        axios.patch(url, {
            name: editedProduct.name,
            price: editedProduct.price,
            description: editedProduct.description,
            quantity: editedProduct.quantity,
            category: selectedCategory.id
        })
            .then((response) => {
                console.log('Mise à jour réussie !', response.data);
                props.parentCallback(false);
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour', error);
            });

        event.preventDefault();
    };
    

    return (
        <>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                <div className="bg-white p-6 shadow-md rounded-md">
                    <h2 className="text-2xl font-semibold mb-4">
                        Modifier un produit
                    </h2>

                    {/* Formulaire d'édition */}
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Nom du produit :</label>
                            <input
                                type="text"
                                name="name"
                                value={editedProduct.name || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Prix :</label>
                            <input
                                type="number"
                                name="price"
                                value={editedProduct.price || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Description :</label>
                            <textarea
                                name="description"
                                value={editedProduct.description || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

						<div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Quantity :</label>
                            <input
                                type="number"
                                name="quantity"
                                value={editedProduct.quantity || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        {/* Barre de recherche pour les catégories */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Catégorie :</label>
                            <Select
                                value={selectedCategory}
                                onChange={handleCategorySelect}
                                onInputChange={handleCategorySearch}
                                options={filteredCategories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => category.id}
                                placeholder="Rechercher une catégorie..."
                                noOptionsMessage={() => 'Aucune catégorie'}
                            />
                        </div>


                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                            onClick={onTrigger}
                        >
                            Enregistrer les modifications
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default ProductEditForm;
