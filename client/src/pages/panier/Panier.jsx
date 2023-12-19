import React, { useEffect, useState, useContext } from "react";
import * as ReactDom from "react-dom";

function Panier(props) {

    const { cart, setCart } = props;

    const fixPrice = (price) => {
        if (typeof price !== "number") {
            price = parseFloat(price);
        }
        return price.toFixed(2);
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

    return (
        <div className="py-7">
            <h1 class="mb-10 text-center text-2xl font-bold">Panier</h1>
            <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                
                <div class="rounded-lg md:w-2/3">
                {cart.map((produit) => (
                    <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                        <img src={produit.images[0].url} alt="product-image" class="w-full rounded-lg sm:w-40" />
                        <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div class="mt-5 sm:mt-0">
                                <h2 class="text-lg font-bold text-gray-900">{produit.name}</h2>
                                <p class="mt-1 text-xs text-gray-700">{fixPrice(produit.price)}€</p>
                                <p class="mt-1 text-xs text-gray-700">{produit.category.name}</p>
                            </div>
                            <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                <div class="flex items-center border-gray-100">
                                    <button class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => changeQuantity(produit, produit.buy_quantity - 1)}> - </button>
                                    <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={produit.buy_quantity} min="1" max={produit.quantity} onChange={(e) => changeQuantity(produit, e.target.value)} />
                                    <button class="cursor-pointer rounded-r bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => changeQuantity(produit, produit.buy_quantity + 1)}> + </button>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <p class="text-sm">{fixPrice(produit.buy_quantity * produit.price)}</p>
                                    <button class="text-red-500 hover:text-red-600" onClick={() => removeFromCart(produit)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>))}
                
                </div>

                <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div class="mb-2 flex justify-between">
                        <p class="text-gray-700">Total</p>
                        <p class="text-gray-700">{fixPrice(cart.reduce((a, c) => a + c.buy_quantity * c.price, 0))}€</p>
                    </div>
                    <div class="flex justify-between">
                        <p class="text-gray-700">Livraison</p>
                        <p class="text-gray-700">Gratuite</p>
                    </div>
                    <hr class="my-4" />
                    <div class="flex justify-between">
                        <p class="text-lg font-bold">Total</p>
                        <div class="">
                            <p class="mb-1 text-lg font-bold">{fixPrice(cart.reduce((a, c) => a + c.buy_quantity * c.price, 0))}€</p>
                            <p class="text-sm text-gray-700">TVA incluse</p>
                        </div>
                    </div>
                    <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Confirmer la commande</button>
                </div>
            </div>
        </div>
    )
}

export default Panier;