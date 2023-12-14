import * as React from "react";
import * as ReactDom from "react-dom";

function Produit() {
    return (
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div class="flex flex-col md:flex-row -mx-4">
                    <div class="md:flex-1 px-4">
                        <div x-data="{ image: 1 }" x-cloak>
                            <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                                <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                                    <img className="object-cover w-full h-full rounded-lg" src="https://everlife.ch/storage/1221/bougie-de-deuil.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="md:flex-1 px-4">
                            <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">Nom du produit</h2>

                            <div class="flex items-center space-x-4 my-4">
                                <div>
                                    <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                                        <span class="font-bold prix text-3xl">Prix</span>
                                        <span class="prix mr-1 mt-1">€</span>
                                    </div>
                                </div>
                            </div>

                            <p class="text-gray-500">Description du produit.</p>

                            <div class="flex py-4 space-x-4">
                                <div class="relative">
                                    <div class="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">Quantité</div>
                                    <select class="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 w-20 flex items-end pb-1">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>

                                    <svg class="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                    </svg>
                                </div>

                                <button type="button" class="h-14 px-6 py-2 font-semibold rounded-xl btn-ajouter hover:bg-black text-white">
                                    Ajouter au panier
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Produit;