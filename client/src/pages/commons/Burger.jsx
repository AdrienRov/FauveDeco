import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Burger(props) {
    const { categories } = props;

    const bestCategories = categories.sort((a, b) => b.subCategories.length - a.subCategories.length).slice(0, 4);   

    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
    return (<>
        <div className="burger-menu relative">
            <div className="burger-menu max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                    <div className="-mr-2 -my-2 md:hidden">
                        <button
                            onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
                            type="button"
                            className="burger-menu rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open menu</span>
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"

                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                    <nav className="hidden md:flex space-x-10">
                        {bestCategories.map(category => (
                            <Link key={category.id} to={`/categories/${category.id}`} className="text-base font-medium">
                                {category.name}
                            </Link>
                        ))}
                    </nav>
                    {
                        burgerMenuOpen && (
                            <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 burger-menu divide-y-2 divide-gray-50">
                                    <div className="pt-5 pb-6 px-5">
                                        <button
                                            onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
                                            type="button"
                                            className="mt-2 me-2 rounded-md p-2 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 absolute top-0 right-0"
                                            aria-expanded="false"
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <svg
                                                className="h-6 w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                        </button>
                                        
                                        <div className="mt-6">
                                            <nav className="grid gap-y-8">
                                                {bestCategories.map(category => (
                                                    <Link key={category.id} to={`/categories/${category.id}`} className="-m-3 p-3 flex items-center rounded-md burger-menu">
                                                        
                                                        <span className="ml-3 text-base font-medium">{category.name}</span>
                                                    </Link>
                                                ))}
                                            </nav>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    }
                    
                </div>
            </div>
        </div>

                
    </>)
}

export default Burger;
