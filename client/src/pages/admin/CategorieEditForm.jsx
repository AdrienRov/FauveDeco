import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategorieEditForm(props) {
	const [editedCategorie, setEditedCategorie] = useState({});
	const [loading, setLoading] = useState(true);
	const { categorieId } = props;

	const handleEditCategorie = async () => {
		// Logique pour éditer la categorie
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setEditedCategorie((prevCategorie) => ({
			...prevCategorie,
			[name]: value,
		}));
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const categorieResponse = await axios.get(`http://localhost:8000/categorie/${categorieId}`);
				setEditedCategorie(categorieResponse.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="container">
			<p>Chargement en cours...</p>
		</div>
	);
}

export default CategorieEditForm;