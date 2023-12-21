import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function CategorieEditForm(props) {
	const [editedCategorie, setEditedCategorie] = useState({});
	const [categories, setCategories] = useState([]);
	const [filteredCategories, setFilteredCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [loading, setLoading] = useState(true);
	const { categorieId } = props;

	const handleEditCategorie = async () => {
		// Logic to edit the category
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setEditedCategorie((prevCategorie) => ({
			...prevCategorie,
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
		if (!categorieId) {
			return;
		}

		axios.get(`http://localhost:8000/category/${categorieId}`).then((response) => {
			setEditedCategorie(response.data);
			setLoading(false);
		}).catch((error) => {
			console.log(error);
		});

		axios.get("http://localhost:8000/categories?limit=99999999999999").then((response) => {
			setCategories(response.data);
			setFilteredCategories(response.data);
			setLoading(false);
		}).catch((error) => {
			console.log(error);
		});
	}, [categorieId]);

	const onTrigger = (event) => {

		const url = `http://127.0.0.1:8000/category/${categorieId}`;
		axios.patch(url, {
			name: editedCategorie.name,
			// Add other properties to update
		})
			.then((response) => {
				console.log('Mise à jour réussie !', response.data);
				window.location.reload();
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
				<div className="bg-white p-6 shadow-md">
					<h2 className="text-2xl font-bold mb-4">Modifier la catégorie</h2>

					{/* Form for editing */}
					<form>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-600">Nom de la catégorie :</label>
							<input
								type="text"
								name="name"
								value={editedCategorie.name || ''}
								onChange={handleChange}
								className="mt-1 p-2 border border-gray-300 w-full"
							/>
						</div>

						{/* Barre de recherche pour les catégories */}
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-600">Catégorie parent :</label>
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
							className="bg-blue-500 text-white px-4 py-2 mt-4 hover:bg-blue-600"
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

export default CategorieEditForm;