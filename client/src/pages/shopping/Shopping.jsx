import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

function Produit(props) {

    const urlProduits = "http://127.0.0.1:8000/products";
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        axios.get(urlProduits)
            .then((response) => {
                setProduits(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        console.log(produits);
    }, []);

    return (
        <div className="container">
            <div className="row">
                {produits.map((produit) => (
                    <div className="col-md-6 mb-4" key={produit.id}>
                        <div className="card">
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <img
                                        src=""
                                        className="card-img"
                                        alt={produit.name}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {produit.name}
                                        </h5>
                                        <p className="card-text">
                                            {produit.description}
                                        </p>
                                        <p className="card-text">{produit.price}€</p>
                                        <a
                                            href="#"
                                            className="btn btn-primary"
                                        >
                                            Ajouter au panier
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Produit;