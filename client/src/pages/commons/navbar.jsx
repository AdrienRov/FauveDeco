import * as React from "react";

function navbar() {
    return (
        <div className="navbar">
            <div className="navbar-start">
                <a className="btn">Boutique</a>
                <a className="btn">A propos</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-end">
                <a className="btn">Compte</a>
                <a className="btn">Recherche</a>
                <a className="btn">Panier</a>
            </div>
        </div>
    )
}

export default navbar;