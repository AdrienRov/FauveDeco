import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModifImage(props) {
    const [product, setProduct] = useState({});
    const { productId } = props;

    useEffect(() => {
        // Récupère les images du produit
        axios.get(`http://127.0.0.1:8000/product/${productId}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [productId]);

    return (
        <>
            <h1>Modification des images du produit {productId}</h1>
            {Object.keys(product).length > 0 && (
                <div>
                    <h2>Nom du produit: {product.name}</h2>
                    <h3>Images du produit:</h3>
                    <ul>
                        {product.images.map((image, index) => (
                            <li key={index}>
                                <img src={image.url} alt={`Image ${index + 1}`} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default ModifImage;
