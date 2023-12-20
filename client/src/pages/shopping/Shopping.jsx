import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

import InfiniteScroll from 'react-infinite-scroller';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';

function Produit(props) {

    const urlProduits = "http://127.0.0.1:8000/products";
    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ search, setSearch ] = useState("");
    const [ canLoadMore, setCanLoadMore ] = useState(true);

    const { cart, setCart } = props;


    useEffect(() => {
        if (!loading || !canLoadMore) {
            return;
        }
        let nbProduits = produits.length;
        let url = urlProduits + "?start=" + nbProduits;
        axios.get(url)
            .then((response) => {
                if (response.data.length === 0) {
                    setCanLoadMore(false);
                }
                setProduits([...produits, ...response.data]);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [loading]);

    return (<>
        <div className="flex justify-center">
            <input type="search" name="q" className="py-2 text-sm rounded-md pl-4 focus:text-gray-900 w-full m-5" placeholder="Rechercher..." autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex justify-center">
            <div className="container">
                <InfiniteScroll pageStart={0} loadMore={() => setLoading(true)} hasMore={canLoadMore} loader={<LoadingSpinner />}>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {produits.map((produit) => (produit.name.toLowerCase().includes(search.toLowerCase()) &&
                            <ProductCard key={produit.id} product={produit} cart={cart} setCart={setCart} />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    </>);
}

export default Produit;