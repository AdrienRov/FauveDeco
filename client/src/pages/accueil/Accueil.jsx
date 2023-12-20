import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import $ from 'jquery';

const Accueil = (props) => {
    const { categories } = props;

    const latestProducts = categories.flatMap(c => c.products).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

    const carouselItems = categories.filter(c => c.imageUrl).sort(c => c.products.length).slice(0, 4).map(p => ({
        id: p.id,
        image: p.imageUrl
    }));

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(current => (current + 1) % carouselItems.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [carouselItems.length]);


    return (

        <div className="container mx-auto">
            <div>
                <div className="carousel w-full h-96">

                    {
                        carouselItems.map((item, index) => (
                            index === current && (
                                <Link to={`/categories/${item.id}`} key={item.id} id={`item${index + 1}`} className={`carousel-item w-full ${index === current ? 'active' : ''}`}>
                                    <img src={item.image} className="w-full object-cover" alt={`Item ${index + 1}`} />
                                </Link>)
                        ))
                    }
                </div>
                <div className="flex justify-center w-full py-2 gap-2">
                    {
                        carouselItems.map((item, index) => (
                            <div key={item.id} className={`w-4 h-4 rounded-full cursor-pointer ${index === current ? 'vert-fonce-background' : 'vert-background'}`} onClick={() => setCurrent(index)}></div>
                        ))
                    }
                </div>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-8 p-10 h-3/5 w-3/5">
                    {categories?.filter(c => !c.parent && c.imageUrl).map(categ => (
                        <Link to={`/categories/${categ.id}`} className="relative overflow-hidden bg-gray-100 p-1 categorie">
                            <img src={categ.imageUrl} alt="car!" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-70 text-white p-5 text-center">
                                <p className="font-bold categorie-title">{categ.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <hr className="my-10" />

            <div className="flex justify-center px-20">
                <div className="flex ligne items-center">
                    <div className="mr-16">
                        <img src="https://lh3.googleusercontent.com/p/AF1QipOu_F6OZUWjNWWRAUVw-M2yavpyJ9Rex9mf98OR=s1360-w1360-h1020" alt="Boutique" className="rounded-xl" />
                    </div>

                    <div className="flex flex-col justify-center">
                        <h3 className="pb-5 text-xl text-center">Bienvenue chez Fauve !</h3>
                        <p className="pb-5 text-center">Fauve, c'est tout d'abord une histoire de passion et de famille. De passion, car je rêvais de créer mon propre univers autour de la décoration. De famille, car "Fauve" fait référence à mon nom: FAUVEL, une sorte d'hommage à mon père et mon grand-père paternel.</p>
                        <p className="pb-5 text-center">Ma volonté : créer une ambiance chaleureuse et électrique où se mélange produits coup de cœur, colorés, de styles et d'origines diverses.</p>
                        <p className="pb-5 text-center">Chez Fauve, vous trouverez le cadeau idéal mais également de quoi vous faire plaisir: objets de décoration, vaisselle, bouquets de fumigation, bougies, linge de maison, produits "lifestyle"... De quoi faire rugir votre intérieur !</p>
                        <p className="pb-5 text-center">Au plaisir de vous accueillir !</p>
                        <p className="pb-5 text-center">Cécile.</p>

                    </div>
                </div>
            </div>

            <hr className="my-10" />

            <div className="flex justify-center items-center">
                <div className="">
                    <div className="rounded-xl titre-background p-3 text-center">
                        <h2 className="text-2xl font-bold">
                            Produit du mois
                        </h2>
                    </div>

                    <div class="flex mt-5 items-center justify-center">
                        <div class="relative flex w-full mx-20 flex-row bg-white bg-clip-border text-gray-700 shadow-md">
                            <div class="relative m-0 w-2/5 shrink-0 overflow-hidden bg-white bg-clip-border text-gray-700">
                                <img
                                    src="https://deconordsud.com/cdn/shop/files/71094820_01_1_720x.jpg?v=1695653873"
                                    alt="image"
                                    class="h-full w-full object-cover"
                                />
                            </div>
                            <div class="p-6">
                                <h6 class="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal vert-color antialiased">
                                    10 000€
                                </h6>
                                <h4 class="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                    Bougie antique
                                </h4>
                                <p class="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                                    Plongez dans une ambiance empreinte d'élégance avec notre Bougie Décorative Antique.
                                </p>

                                <p class="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                                    Soigneusement conçue pour évoquer le charme du passé, cette bougie enchanteresse illumine votre espace avec une lueur chaleureuse.
                                </p>

                                <p class="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                                    Fabriquée avec une attention méticuleuse aux détails, elle ajoute une touche sophistiquée à votre décor, diffusant un parfum subtil qui transporte vos sens vers une époque révolue.
                                </p>
                                <a class="inline-block" href="#">
                                    <button
                                        class="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase titre-color transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button"
                                    >
                                        Regarder
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="2"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                            class="h-4 w-4"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                            ></path>
                                        </svg>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <hr className="my-10" />

            <div class="text-center mt-8 rounded-xl titre-background p-3 text-center">
                <h2 class="text-2xl font-bold">Nouveaux arrivages</h2>
            </div>

            <div class="flex items-center justify-center pb-5 pt-5">
                {
                    latestProducts.map(product => (
                        <div class="mx-auto px-5">
                            <Link to={`/produit/${product.id}`}>
                                <div class="max-w-xs cursor-pointer bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                                    <img class="w-full h-56 object-cover object-center" src={product.images[0].url} alt="product" />
                                    <p class="mt-4 font-bold text-center">{product.name}</p>
                                    <p class="mb-4 text-gray-800 text-center">{product.price}€</p>
                                </div>
                            </Link>
                        </div>
                    ))
                }

            </div>
        </div>

    )
}

export default Accueil;