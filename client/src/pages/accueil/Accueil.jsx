import React, { useEffect, useState, useContext } from 'react';

function Accueil(props) {
    //recuperation des categories depuis le props
    const { categories } = props;
    useEffect(() => {
        console.log(categories);
    }, []);
    return (

        <div className="container mx-auto">
            <div className="carousel w-full h-96">
                <div id="item1" className="carousel-item w-full">
                    <img src="https://files.clemaroundthecorner.com/wp-content/uploads/2023/01/piece-de-vie-salon-lumineux-tapis-colore-canape-porte-fenetre-vitree.jpg" className="w-full object-cover" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img src="https://img-4.linternaute.com/M5Sk18UdXplN9AeXVOJoJdudja4=/fit-in/x630/smart/filters:fill(1D1D1B)/f614700fdda64d22be4722acd3912fef/ccmcms-linternaute/11577654.jpg" className="w-full object-cover" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img src="https://www.poulettemagique.com/wp-content/uploads/2015/02/salon-poulette-magique-deco-8.jpg" className="w-full object-cover" />
                </div>
                <div id="item4" className="carousel-item w-full">
                    <img src="https://www.onedayevent.fr/uploads/files/url-t-site1media-6886.jpg" className="w-full object-cover" />
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs gris-background"></a>
                <a href="#item2" className="btn btn-xs gris-background"></a>
                <a href="#item3" className="btn btn-xs gris-background"></a>
                <a href="#item4" className="btn btn-xs gris-background"></a>
            </div>



            <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-8 p-10 h-3/5 w-3/5">
                    {categories?.map(categ => (
                       <div className="relative overflow-hidden bg-gray-100 p-1 categorie">
                       <img src="https://i.goopics.net/8dmjcn.jpg" alt="car!" className="w-full h-full object-cover" />
                       <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-70 text-white p-2 text-center">
                           <button className="btn btn-ghost categorie-title">{categ.name}</button>
                       </div>
                   </div>
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
                        <h3 className="pb-5 text-xl text-center">Making your favorite houseplant look pretty is what we do best</h3>
                        <p className="pb-5 text-center">Lyss started Plantaby in early 2020. In the process of decorating her own indoor jungle, she found herself wanting pieces that reflect her love of color and spark joy in the home. It was during this time that she originally pivoted her art to focus on hand-painted pots, planters, and homewares. Through pairing an obsession with plants with a love of bright colors, the idea for Plantaby started to take root and grow.</p>
                        <p className="pb-5 text-center">Today, Plantaby's signature hand painted pots and candles can be found in homes and select shops throughout the United States, Australia, and Canada. Lyss has a small studio based in Seattle, Washington, where she paints each and every item herself.</p>
                    </div>
                </div>
            </div>

            <hr className="my-10" />

            <div className="flex justify-center items-center">
                <div className="max-w-3xl">
                    <div className="rounded-xl titre-background p-3 text-center">
                        <h2 className="text-2xl font-bold">
                            Produit du mois
                        </h2>
                    </div>

                    <div class="flex mt-5 items-center justify-center">
                        <div class="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                            <div class="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
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

                <div class="mx-auto px-5">
                    <div class="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                        <img class="w-full h-56 rounded-lg object-cover object-center" src="https://voisla.fr/1778-large_default/serviettes-de-table-lot-de-2-alsace-pop.jpg" alt="product" />
                        <p class="mt-4 font-bold text-center">Product Name</p>
                        <p class="mb-4 text-gray-800 text-center">79€</p>
                    </div>
                </div>

                <div class="mx-auto px-5">
                    <div class="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                        <img class="w-full h-56 rounded-lg object-cover object-center" src="https://www.guideastuces.com/image_upload/877a0a4d97cc1667e97e390086a7a3d0/1437473139_0.jpg" alt="product" />
                        <p class="mt-4 font-bold text-center">Product Name</p>
                        <p class="mb-4 text-gray-800 text-center">79€</p>
                    </div>
                </div>

                <div class="mx-auto px-5">
                    <div class="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                        <img class="w-full h-56 rounded-lg object-cover object-center" src="https://cdn.shopify.com/s/files/1/0622/5618/5533/files/lampe-de-chevet-design-colore-2.png?v=1664226346" alt="product" />
                        <p class="mt-4 font-bold text-center">Product Name</p>
                        <p class="mb-4 text-gray-800 text-center">79€</p>
                    </div>
                </div>

                <div class="mx-auto px-5">
                    <div class="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                        <img class="w-full h-56 rounded-lg object-cover object-center" src="https://maelacreations.fr/wp-content/uploads/2022/12/sac-original-vintage-colore-girly-orange-rose-vert-10.jpg" alt="product" />
                        <p class="mt-4 font-bold text-center">Product Name</p>
                        <p class="mb-4 text-gray-800 text-center">79€</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Accueil;