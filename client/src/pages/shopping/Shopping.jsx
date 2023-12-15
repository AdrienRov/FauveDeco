import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

import InfiniteScroll from 'react-infinite-scroller';

function Produit(props) {

    const urlProduits = "http://127.0.0.1:8000/products";
    const [produits, setProduits] = useState([]);

    const [cart, setCart] = useState(() => localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    const [loading, setLoading] = useState(true);

    const addToCart = (produit) => {
        const exist = cart.find((x) => x.id === produit.id);
        if (exist) {
            setCart(
                cart.map((x) =>
                    x.id === produit.id ? { ...exist, buy_quantity: exist.buy_quantity + 1 } : x
                )
            );
        } else {
            setCart([...cart, { ...produit, buy_quantity: 1 }]);
        }
    }

    const removeFromCart = (produit) => {
        const exist = cart.find((x) => x.id === produit.id);
        if (exist) {
            setCart(cart.filter((x) => x.id !== produit.id));
        }
    }

    const changeQuantity = (produit, quantity) => {
        if (quantity < 1) {
            return;
        }
        const exist = cart.find((x) => x.id === produit.id);
        if (exist) {
            setCart(
                cart.map((x) =>
                    x.id === produit.id ? { ...exist, buy_quantity: quantity } : x
                )
            );
        }
    }


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

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const ProductItem = (props) => {
        const { produit } = props;
        const cartItem = cart.find((x) => x.id === produit.id);
        return (
            <div className="col-lg-4 col-md-6 mb-4 mx-7 mt-7 p-3" key={produit.id}>
                <div class="mx-auto px-5">
                    <div class="w-full bg-white p-2 shadow duration-150">
                        <Link to={`/produit/${produit.id}`}><img class="w-full h-56 object-cover object-center" src={produit.images[0].url} alt="product" /></Link>
                        <div className='row'>
                            <div>
                                <p class="mt-4 font-bold text-center">{produit.name}</p>
                                <p class="mb-4 text-gray-800 text-center">{produit.price}€</p>    
                            </div>
                            <div>
                                {
                                    // if you have any in cart, show quantity as well as remove button
                                    cartItem && (<div class="flex mt-4 p-4 me-4 btn-panier text-center py-2">
                                        <button class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => changeQuantity(cartItem, cartItem.buy_quantity - 1)}> - </button>
                                        <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={cartItem.buy_quantity} min="1" max={cartItem.quantity} onChange={(e) => changeQuantity(cartItem, e.target.value)} />
                                        <button class="cursor-pointer rounded-r bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => changeQuantity(cartItem, cartItem.buy_quantity + 1)}> + </button>
                                        <button class="cursor-pointer rounded-r bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => removeFromCart(cartItem)}> X </button>
                                    </div>) || <button class="mt-4 p-4 btn-panier text-center py-2 duration-150" onClick={() => addToCart(produit)}>Ajouter au panier</button>


                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <InfiniteScroll pageStart={0} loadMore={() => setLoading(true)} hasMore={true} loader={<div className="loader" key={0}>Loading ...</div>}>

                <div className="row">
                    {produits.map((produit) => (
                        <ProductItem produit={produit} key={produit.id} /> 
                    ))}

                </div>
            </InfiniteScroll>

        </div>
    );
}

export default Produit;