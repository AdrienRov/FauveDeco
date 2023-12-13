import * as React from "react";

function Accueil() {
    return (
        <div className="container mx-auto">
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>



            <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-8 p-10 h-3/5 w-3/5">
                    <div className="relative overflow-hidden bg-gray-100 p-1 categorie">
                        <img src="https://i.goopics.net/8dmjcn.jpg" alt="car!" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-70 text-white p-2 text-center">
                            <button className="btn btn-ghost categorie-title">Bijoux</button>
                        </div>
                    </div>
                    <div className="relative overflow-hidden bg-gray-200 p-1 categorie">
                        <img src="https://i.goopics.net/7aipq9.jpg" alt="car!" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-70 text-white p-2 text-center">
                            <button className="btn btn-ghost categorie-title">Décorations</button>
                        </div>
                    </div>
                    <div className="relative overflow-hidden bg-gray-200 p-1 categorie">
                        <img src="https://i.goopics.net/np8p6k.jpg" alt="car!" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-70 text-white p-2 text-center">
                            <button className="btn btn-ghost categorie-title">Textile</button>
                        </div>
                    </div>
                    <div className="relative overflow-hidden bg-gray-200 p-1 categorie">
                        <img src="https://i.goopics.net/68hds5.png" alt="car!" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-70 text-white p-2 text-center">
                            <button className="btn btn-ghost categorie-title">Sacs / Paniers</button>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-10" />

            <div className="flex justify-center px-20">
                <div className="flex ligne">
                    <div className="">
                    <img src="https://lh3.googleusercontent.com/p/AF1QipOu_F6OZUWjNWWRAUVw-M2yavpyJ9Rex9mf98OR=s1360-w1360-h1020" alt="Boutique" className="" />
                    </div>

                    <div className="flex colonne justify-center ml-4">
                        <h3>Making your favorite houseplant look pretty is what we do best</h3>
                        <p>Lyss started Plantaby in early 2020. In the process of decorating her own indoor jungle, she found herself wanting pieces that reflect her love of color and spark joy in the home. It was during this time that she originally pivoted her art to focus on hand-painted pots, planters, and homewares. Through pairing an obsession with plants with a love of bright colors, the idea for Plantaby started to take root and grow.</p>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Accueil;