import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function CategoryAddForm(props) {
    const [newCategory, setNewCategory] = useState({
        name: '',
        parentCategory: null,
    });
    const [parentCategories, setParentCategories] = useState([]);
    const [filteredParentCategories, setFilteredParentCategories] = useState([]);
    const [selectedParentCategory, setSelectedParentCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    const handleParentCategorySelect = (selectedOption) => {
        setSelectedParentCategory(selectedOption);
    };

    const handleParentCategorySearch = (query) => {
        const filtered = parentCategories.filter((category) =>
            `${category.name}`.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredParentCategories(filtered);
    };

    const onTrigger = (event) => {
        const url = 'http://127.0.0.1:8000/category';

        axios.post(url, {
            name: newCategory.name,
            parent: selectedParentCategory ? selectedParentCategory.id : null,
        })
            .then((response) => {
                console.log('Catégorie ajoutée avec succès !', response.data);
                // Vous pouvez rediriger l'utilisateur vers la liste des catégories ou effectuer d'autres actions nécessaires.
				props.parentCallback(false);
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout de la catégorie', error);
            });

        event.preventDefault();
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/categories?limit=99999999999999').then((response) => {
            setParentCategories(response.data);
            setFilteredParentCategories(response.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, []);

    return (
        <>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                <div className="bg-white p-6 shadow-md rounded-md">
                    <h2 className="text-2xl font-semibold mb-4">
                        Ajouter une catégorie
                    </h2>

                    {/* Formulaire d'ajout de catégorie */}
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Nom de la catégorie :</label>
                            <input
                                type="text"
                                name="name"
                                value={newCategory.name}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        {/* Barre de recherche pour les catégories parentes */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Catégorie parente :</label>
                            <Select
                                value={selectedParentCategory}
                                onChange={handleParentCategorySelect}
                                onInputChange={handleParentCategorySearch}
                                options={filteredParentCategories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => category.id}
                                placeholder="Rechercher une catégorie parente..."
                                noOptionsMessage={() => 'Aucune catégorie parente'}
                            />
                        </div>

                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                            onClick={onTrigger}
                        >
                            Ajouter la catégorie
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default CategoryAddForm;
