import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModifImage(props) {
    const [product, setProduct] = useState({});
    const { productId } = props;

    const handleAddImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', e.target.image.files[0]);

        axios.post(`http://localhost:8000/product/${productId}/images`, formData).then((response) => {
            console.log('Image ajoutée avec succès');
            // Mettre à jour l'état local après l'ajout
            setProduct((prevProduct) => {
                const newProduct = { ...prevProduct };
                newProduct.images = [...newProduct.images, response.data];
                return newProduct;
            });
        }).catch((error) => {
            console.log('Erreur lors de l\'ajout de l\'image:', error);
        });
       
    };

    const handleDeleteImage = async (image) => {
        axios.delete(`http://localhost:8000/product/${productId}/images/${image.id}`).then((response) => {
            console.log(`Image ${image.id} deleted successfully`);
            // Mettre à jour l'état local après la suppression
            setProduct((prevProduct) => {
                const newProduct = { ...prevProduct };
                newProduct.images = newProduct.images.filter((img) => img.id !== image.id);
                return newProduct;
            });
        }).catch((error) => {
            console.log(`Error deleting image ${image.id}:`, error);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Faire une requête GET pour obtenir les informations du produit
                const response = await axios.get(`http://localhost:8000/product/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [productId]);

    return (
        <>
            <h1>Chargement ... </h1>
            {Object.keys(product).length > 0 && (
                <div className="bg-white p-4 shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-2">Nom du produit: {product.name}</h2>

                    <h3 className="text-lg font-semibold mb-2">Images du produit:</h3>

                    <ul className="grid grid-cols-2 gap-4">
                        {product.images.map((image, index) => (
                            <li key={index} className="mb-2">
                                <img src={image.url} alt={`Image ${index + 1}`} className="w-full h-auto rounded-md" />

                                {/* Bouton pour supprimer une image */}
                                <button className="bg-red-500 text-white px-2 py-1 rounded mt-2" onClick={() => handleDeleteImage(image)}>
                                    Supprimer
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Bouton pour ajouter une image */}
                    <form onSubmit={handleAddImage} className="mt-4">
                        <input type="file" name="image" id="image" className="mb-2" />
                        <input className="bg-green-500 text-white px-4 py-2 rounded mt-4" type="submit" value="Ajouter une image" />
                            
                    </form>

                </div>
            )}
        </>
    );
}

export default ModifImage;
