import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import ModifImage from "./ModifImages";
import CategorieEditForm from "./CategorieEditForm";
import CategoryAddForm from "./CategoryAddForm";
import LoadingSpinner from '../../components/LoadingSpinner';

function TableCategorie() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(<ModifImage />);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [formKey, setFormKey] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

	const handleEdit = (id) => {
		setForm(<CategorieEditForm categorieId={id} parentCallback={handleCallback} />);
		setVisible(true);
	};

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/category/${id}`)
      .then((response) => {
        console.log(`Categorie ${id} deleted successfully`);
        // Mettre à jour l'état local après la suppression
        setCategories((prevCategories) =>
          prevCategories.filter((categorie) => categorie.id !== id)
        );
      })
      .catch((error) => {
        console.log(`Error deleting categorie ${id}:`, error);
      });
  };

  const handleAdd = () => {
    setForm(<CategoryAddForm parentCallback={handleCallback} />);
    setVisible(true);
  };

  const handleCallback = (data) => {
    setVisible(data);
    setFormKey(formKey + 1);
  };

  const handleModifImages = (productId) => {
    setForm(
      <ModifImage productId={productId} parentCallback={handleCallback} />
    );
    setFormKey(formKey + 1);
    setVisible(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/categories?limit=99999999999999")
      .then((response) => {
        const categoriesArray = [response.data[0]];
        setCategories(response.data);
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
            title="Connexion"
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
            <label className="navbar-center text-base text-white">
              Liste des catégories
            </label>
            <div className="navbar-end flex items-center">
              <button
                className="bg-accent-content text-white px-4 py-2 rounded"
                onClick={() => {
                  handleAdd();
                }}>
                Ajouter une catégorie
              </button>
            </div>
          </div>
          <table className="table table-zebra">
            <thead className="vert bg-accent-content text-white">
              <tr>
                <th>Images</th>
                <th>Nom</th>
                <th>Parent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories
                .filter((category) =>
                  category.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((category) => (
                  <tr key={category.id}>
                    <td>
                      <button onClick={() => handleModifImages(category.id)}>
                        Modifier images
                      </button>
                    </td>
                    <td>{category.name}</td>
                    <td>{(category.parent && category.parent.name) || ""}</td>
                    <td className='flex gap-2'>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
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
