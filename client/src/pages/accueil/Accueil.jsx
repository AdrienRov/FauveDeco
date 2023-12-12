import * as React from "react";
import * as ReactDom from "react-dom";

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

            <div className="flex flex-col w-full h-full lg:flex-row">
                <div className="grid flex-grow h-full card place-items-center">
                    <div className="card w-96 glass">
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!"/></figure>
                        <div className="card-body">
                            <div className="card-actions justify-center">
                            <button className="btn btn-primary">Bijoux</button>
                            </div>
                        </div>
                    </div>
                </div> 
            <div className="divider lg:divider-horizontal"></div> 
                <div className="grid flex-grow h-full card place-items-center">
                    <div className="card w-96 glass">
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!"/></figure>
                        <div className="card-body">
                            <div className="card-actions justify-center">
                            <button className="btn btn-primary">Décorations</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full h-full lg:flex-row">
                <div className="grid flex-grow h-full card place-items-center">
                    <div className="card w-96 glass">
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!"/></figure>
                        <div className="card-body">
                            <div className="card-actions justify-center">
                            <button className="btn btn-primary">Textile</button>
                            </div>
                        </div>
                    </div>
                </div> 
            <div className="divider lg:divider-horizontal"></div> 
                <div className="grid flex-grow h-full card place-items-center">
                    <div className="card w-96 glass">
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!"/></figure>
                        <div className="card-body">
                            <div className="card-actions justify-center">
                            <button className="btn btn-primary">Sacs / Paniers</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Accueil;