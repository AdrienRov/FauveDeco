import * as React from "react";
import { Link, useLocation } from "react-router-dom";

function Burger() {
    return (
        <div className="navbar pt-0">
            
                <div className="navbar-start flex justify-center">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-nav back-vert duration-150">Catégories</div>
                        <ul className="back-vert dropdown-content z-[1] menu shadow bg-base-100 w-52">
                            <li><Link to="/categories/0" className="back-vert btn-nav dropdown-item text-black">
                                Maison et objets
                            </Link></li>
                            <li><Link to="/categories/1" className="back-vert btn-nav dropdown-item text-black">
                                Fragrances
                            </Link></li>
                            <li><Link to="/categories/2" className="back-vert btn-nav dropdown-item text-black">
                                Lifestyle
                            </Link></li>
                            <li><Link to="/categories/2" className="back-vert btn-nav dropdown-item text-black">
                                Décorations murales
                            </Link></li>
                            <li><Link to="/categories/2" className="back-vert btn-nav dropdown-item text-black">
                                Idées cadeaux
                            </Link></li>
                        </ul>
                    </div>
                </div>
            
            <div className="navbar-start flex justify-center">
                <Link to="/categories/0" className="btn btn-nav back-vert duration-150">Maison et objets</Link>
                <Link to="/categories/1" className="btn btn-nav back-vert duration-150">Fragrances</Link>
                <Link to="/categories/2" className="btn btn-nav back-vert duration-150">Lifestyle</Link>
            </div>
            <div className="navbar-end flex justify-center">
                <Link className="btn btn-nav back-vert duration-150">Décorations murales</Link>
                <Link className="btn btn-nav back-vert duration-150">Idées cadeaux</Link>
            </div>
        </div>



    )
}

export default Burger;
