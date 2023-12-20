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
        const fetchData = async () => {
            try {
                const productResponse = await axios.get(`http://127.0.0.1:8000/product/${product}`);
                setEditedProduct(productResponse.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [product]);

    const onTrigger = (event) => {
        const formData = new FormData();
        formData.append('name', editedProduct.name);
        formData.append('price', editedProduct.price);
        formData.append('description', editedProduct.description);
		formData.append('quantity', editedProduct.quantity);
		formData.append('category', editedProduct.category);

        const url = `http://127.0.0.1:8000/product/${product}`; 

        axios.patch(url, formData)
            .then((response) => {
                console.log('Mise à jour réussie !', response.data);
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
                            <textarea
                                name="quantity"
                                value={editedProduct.quantity || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        {/* Barre de recherche pour les catégories */}
                        <Select
                            value={selectedCategory ? { value: selectedCategory, label: `${selectedCategory.name}` } : null}
                            options={filteredCategories.map((category) => ({
                                value: category,
                                label: `${category.name}`,
                            }))}
                            onInputChange={(value) => handleCategorySearch(value)}
                            onChange={(selectedOption) => handleCategorySelect(selectedOption.value)}
                            placeholder="Rechercher une category"
                        />

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
