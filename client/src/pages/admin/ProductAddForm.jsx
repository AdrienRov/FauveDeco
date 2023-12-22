import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function ProductAddForm(props) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    category: null,
  });
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewProduct((prevProduct) => ({
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
    axios
      .get("http://localhost:8000/categories?limit=99999999999999")
      .then((response) => {
        setCategories(response.data);
        setFilteredCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const onTrigger = (event) => {
    const url = `http://localhost:8000/product`;

    axios
      .post(url, {
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
        quantity: newProduct.quantity,
        category: selectedCategory.id,
      })
      .then((response) => {
        console.log("Produit ajouté avec succès !", response.data);
        // Vous pouvez rediriger l'utilisateur vers la liste des produits ou effectuer d'autres actions nécessaires.
		props.parentCallback(false);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du produit", error);
      });

    event.preventDefault();
  };

  return (
    <>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Ajouter un produit</h2>

          {/* Formulaire d'ajout */}
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Nom du produit :
              </label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Prix :
              </label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Description :
              </label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Quantité :
              </label>
              <input
                type="number"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Barre de recherche pour les catégories */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Catégorie :
              </label>
              <Select
                value={selectedCategory}
                onChange={handleCategorySelect}
                onInputChange={handleCategorySearch}
                options={filteredCategories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => category.id}
                placeholder="Rechercher une catégorie..."
                noOptionsMessage={() => "Aucune catégorie"}
              />
            </div>

            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
              onClick={onTrigger}
            >
              Ajouter le produit
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ProductAddForm;
