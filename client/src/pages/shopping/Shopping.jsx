import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

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
                    <div className="col-lg-4 col-md-6 mb-4 mx-7 mt-7 p-3" key={produit.id}>
                        <div class="mx-auto px-5">
                            <div class="w-full bg-white p-2 shadow duration-150">
                                <Link to={`/produit/${produit.id}`}><img class="w-full h-56 object-cover object-center" src={produit.images[0]} alt="product" /></Link>
                                <div className='row'>
                                    <div>
                                        <p class="mt-4 font-bold text-center">{produit.name}</p>
                                        <p class="mb-4 text-gray-800 text-center">{produit.price}€</p>    
                                    </div>
                                    <div>
                                        <button class="mt-4 p-4 btn-panier text-center py-2 duration-150">Ajouter au panier</button>
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