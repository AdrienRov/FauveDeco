import React, { useEffect, useState, useContext } from 'react';
import { Button } from "react-daisyui";

const NavBarAdmin = (props) => {
   
    const handleChangeTable = (data) => {
        props.parentCallback(data);
    }
    return (
        <nav className="navbar p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">
                    Administration
                </div>
                <ul className="flex space-x-4">
                    <Button color="primary" outline={true} size="sm" className="mr-2" onClick={handleChangeTable("user")}>Utilisateurs</Button>
                    <Button color="primary" outline={true} size="sm" className="mr-2" onClick={handleChangeTable("orders")}>Commandes</Button>
                    <Button color="primary" outline={true} size="sm" className="mr-2" onClick={handleChangeTable("products")}>Produits</Button>
                </ul>
            </div>
        </nav>
    );
};

export default NavBarAdmin;
