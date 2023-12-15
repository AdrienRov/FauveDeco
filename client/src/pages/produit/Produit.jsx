import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

import * as ReactDom from "react-dom";
import axios from 'axios';


function Produit(props) {

    const { cart, setCart } = props;

    let { id } = useParams();

    id = parseInt(id);

    const [ produit, setProduit ] = useState(null);

    useEffect(() => {
        const url = `http://127.0.0.1:8000/product/${id}`;
        axios.get(url).then(response => {
            setProduit(response.data);
        });
    }, [id]);

    if (!produit) {
        return (<div>Produit introuvable</div>);
    }

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

    const cartItem = cart.find((x) => x.id === produit.id);
    return (
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div class="flex flex-col md:flex-row -mx-4">
                    <div class="md:flex-1 px-4">
                        <div x-data="{ image: 1 }" x-cloak>
                            <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                                <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                                    <img className="object-cover w-full h-full rounded-lg" src={produit.images[0].url} alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="md:flex-1 px-4">
                            <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{ produit.name }</h2>

                            <div class="flex items-center space-x-4 my-4">
                                <div>
                                    <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                                        <span class="font-bold prix text-3xl">{produit.price}€</span>
                                    </div>
                                </div>
                            </div>

                            <p class="text-gray-500">{produit.description}</p>

                            <div class="flex py-4 space-x-4">
                                
                                {
                                    cartItem && (<>
                                    <div class="flex items-center">
                                        <button class="rounded-lg bg-gray-100 py-2 px-3" onClick={() => changeQuantity(cartItem, cartItem.buy_quantity - 1)}>
                                            <span class="font-bold text-gray-600 text-lg">-</span>
                                        </button>
                                        <span class="mx-2 text-gray-700">{cartItem.buy_quantity}</span>
                                        <button class="rounded-lg bg-gray-100 py-2 px-3" onClick={() => changeQuantity(cartItem, cartItem.buy_quantity + 1)}>
                                            <span class="font-bold text-gray-600 text-lg">+</span>
                                        </button>
                                    </div>
                                    <button class="flex items-center justify-center px-4 py-2 bg-gray-800 text-white text-base font-medium rounded-lg hover:bg-gray-700" onClick={() => removeFromCart(produit)}>
                                        <svg class="h-6 w-6 mr-2 fill-current text-white" viewBox="0 0 24 24">
                                            <path d="M19 13H5v-2h14v2z" />
                                        </svg>
                                        <span>Retirer du panier</span>
                                    </button>
                                    </>) || (
                                        <button type="button" class="h-14 px-6 py-2 font-semibold rounded-xl btn-ajouter hover:bg-black text-white" onClick={() => addToCart(produit)}>
                                            Ajouter au panier
                                        </button>
                                    )
                                }

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Produit;