import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

import InfiniteScroll from 'react-infinite-scroller';
import ProductCard from '../../components/ProductCard';

function Produit(props) {

    const urlProduits = "http://127.0.0.1:8000/products";
    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(true);

    const { cart, setCart } = props;
    

    useEffect(() => {
        console.log("loading: " + loading)
        if (!loading) {
            return;
        }
        let nbProduits = produits.length;
        let url = urlProduits + "?start=" + nbProduits;
        axios.get(url)
            .then((response) => {
                setProduits([...produits, ...response.data]);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [loading]);

    return (
        <div className="container">
            <InfiniteScroll pageStart={0} loadMore={() => setLoading(true)} hasMore={true} loader={<div className="loader" key={0}>Loading ...</div>}>

                <div className="row">
                    {produits.map((produit) => (
                        <ProductCard key={produit.id} product={produit} cart={cart} setCart={setCart} />
                    ))}

                </div>
            </InfiniteScroll>

        </div>
    );
}

export default Produit;