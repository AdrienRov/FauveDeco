import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModifImage(props) {
    const [product, setProduct] = useState({});
    const { productId } = props;

    const handleAddImage = async () => {
       
    };

    const handleDeleteImage = async (index) => {
     
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Faire une requête GET pour obtenir les informations du produit
                const response = await axios.get(`http://127.0.0.1:8000/product/${productId}`);
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
                                <button className="bg-red-500 text-white px-2 py-1 rounded mt-2" onClick={() => handleDeleteImage(index)}>
                                    Supprimer
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Bouton pour ajouter une image */}
                    <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={handleAddImage}>
                        Ajouter une image
                    </button>
                </div>
            )}
        </>
    );
}

export default ModifImage;
