import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";



const ProductCard = (props) => {
    const { product, cart, setCart } = props;
    const cartItem = cart.find((x) => x.id === product.id);
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
        if (typeof quantity !== "number") {
            quantity = parseInt(quantity);
        }
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
    const fixPrice = (price) => {
        if (typeof price !== "number") {
            price = parseFloat(price);
        }
        return price.toFixed(2);
    }
    return (
        <div className="col-lg-4 col-md-6 mb-4 mx-7 mt-7 p-3" key={product.id}>
            <div class="mx-auto px-5">
                <div class="w-full bg-white p-2 shadow duration-150">
                    <Link to={`/produit/${product.id}`}><img class="w-full h-56 object-cover object-center" src={product.images[0].url} alt="product" /></Link>
                    <div className='row'>
                        <div>
                            <p class="mt-4 font-bold text-center">{product.name}</p>
                            <p class="mb-4 text-gray-800 text-center">{fixPrice(product.price)}€</p>    
                        </div>
                        <div>
                            {
                                cartItem && (<div class="flex mt-4 p-4 me-4 btn-panier text-center py-2">
                                    <button class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => changeQuantity(cartItem, cartItem.buy_quantity - 1)}> - </button>
                                    <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={cartItem.buy_quantity} min="1" max={cartItem.quantity} onChange={(e) => changeQuantity(cartItem, e.target.value)} />
                                    <button class="cursor-pointer rounded-r bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => changeQuantity(cartItem, cartItem.buy_quantity + 1)}> + </button>
                                    <button class="cursor-pointer rounded-r bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => removeFromCart(cartItem)}> X </button>
                                </div>) || <button class="mt-4 p-4 btn-panier text-center py-2 duration-150" onClick={() => addToCart(product)}>Ajouter au panier</button>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;