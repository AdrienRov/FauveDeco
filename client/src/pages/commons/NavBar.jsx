import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button } from "react-daisyui";
import Modal from "../../components/Modal";
import Connexion from "../../form/Connexion";
import Inscription from "../../form/Inscription";
import axios from 'axios';


const LoginButton = (props) => {
    const { handleConnexion } = props;
    return (
        <Button className="btn btn-ghost" onClick={() => handleConnexion()}>
            <svg class="w-[25px] h-[25px] fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"></path>
            </svg>
        </Button>
    );
}

const UserButton = (props) => {
    return (
        <Link to="/user" className="btn btn-ghost">
            <svg class="w-[25px] h-[25px] fill-[#ffffff]" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M224 288c70.7 0 128-57.3 128-128S294.7 32 224 32S96 89.3 96 160s57.3 128 128 128zm0 32c-88.4 0-176 43.52-176 128v32h352v-32c0-84.48-87.6-128-176-128zm224 128c0-53.02-43-96-96-96H96c-53 0-96 42.98-96 96v96c0 53 43 96 96 96h256c53 0 96-43 96-96v-96z"></path>
            </svg>
        </Link>
    );
}

const LogoutButton = (props) => {
    const { handleLogout } = props;
    return (
        <Button className="btn btn-ghost" onClick={() => handleLogout()}>
            <svg class="w-[25px] h-[25px] fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"></path>
            </svg>
        </Button>
    );
}

const ShoppingCartButton = (props) => {
    const { cart } = props;
    return (
        <Link to="/panier" className="btn btn-ghost">
            <div class="relative flex items-center justify-center">
                <svg class="w-[25px] h-[25px] fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zm128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                {
                    cart.length > 0 && (
                        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                            {cart.length}
                        </div>
                    )
                }
            </div>
        </Link>
    );
}

const ShoppingButton = (props) => {
    return (
        <Link to="/shopping" className="btn btn-ghost">
            <svg class="w-[25px] h-[25px] fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
        </Link>
    );
}

const AdminButton = (props) => {
    const { handleDisplayAdmin } = props;
    return (
        <Link to="/admin" onClick={() => handleDisplayAdmin()} className="btn btn-ghost">
            <svg class="w-[23px] h-[23px] fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"></path></svg>
        </Link>
    );
}

function NavBar(props) {

    const [visible, setVisible] = useState(false);
    const [form, setForm] = useState(<Connexion />);
    const [formKey, setFormKey] = useState(10);

    const location = useLocation()

    if (location.pathname === "/admin") {
        return null
    }

    const { categories } = props;

    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    const loggedIn = user !== null;
    const isAdmin = loggedIn && user.role === 2;

    const handleCallback = (data) => {
        setVisible(data);
        setFormKey(formKey + 1);
    };
    const handleConnexion = () => {
        setForm(<Connexion parentCallback={handleCallback} handleSwitch={handleInscription} />);
        setVisible(true);
        setFormKey(formKey + 1);
    }
    const handleInscription = () => {
        console.log("Inscription");
        setForm(<Inscription parentCallback={handleCallback} handleSwitch={handleConnexion} />);
        setVisible(true);
        setFormKey(formKey + 1);
    };
    const handleLogout = () => {
        localStorage.removeItem("user");
        axios.get("http://localhost:8000/logout").then(() => {
            window.location.href = "/";
        }).catch(err => {
            window.location.href = "/";
        });
    }

    const handleDisplayAdmin = () => {
        props.parentCallback("admin");
    }

    const bestCategories = categories.sort((a, b) => b.products.length - a.products.length).slice(0, 5);


    return (
        <header>
            <Modal key={formKey} parentCallback={handleCallback} open={visible} form={form} title="Connexion" />

            <div className="navbar">
                <div className="navbar-start divider divider-white">
                    <div className="dropdown px-15 mb-1 hidden md:flex">
                        <div tabIndex={0} role="button" className="btn btn-nav back-vert duration-150">Catégories<svg class="w-[15px] h-[15px] fill-[#ffffff]" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg"><path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"></path></svg></div>
                        <ul className="back-vert dropdown-content z-[1] menu shadow bg-base-100 w-60">
                            <li>
                                <Link to={`/categories`} className="back-vert btn-nav dropdown-item">
                                    Toutes les catégories
                                </Link>
                            </li>
                            <hr className="mx-4" />
                            {
                                bestCategories.map(category => (
                                    <li key={category.id}><Link to={`/categories/${category.id}`} className="back-vert btn-nav dropdown-item">
                                        {category.name}
                                    </Link></li>
                                ))
                            }
                        </ul>
                    </div>
                    <Link to="https://www.instagram.com/fauve.lh/" className="mr-5 hidden md:flex">
                        <svg class="w-[25px] h-[25px] fill-[#ffffff]" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                        </svg>
                    </Link>
                    <Link to="https://www.facebook.com/profile.php?id=100094723031338" class="hidden md:flex">
                        <svg class="w-[25px] h-[25px] fill-[#ffffff]" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
                        </svg>
                    </Link>
                </div>

                <Link to="/accueil" className="navbar-center hidden lg:flex mx-5 mb-0">
                    <p className="text-4xl text-white">fauve</p>
                    <p className="text-white">DECORATION</p>
                </Link>

                <div className="navbar-end divider divider-white hidden md:flex">
                    {
                        loggedIn ? (
                            <>
                                <UserButton />
                                <LogoutButton handleLogout={handleLogout} />
                            </>
                        ) : (
                            <LoginButton handleConnexion={handleConnexion} />
                        )
                    }

                    <ShoppingButton />
                    <ShoppingCartButton cart={props.cart} />
                    {isAdmin && <AdminButton handleDisplayAdmin={handleDisplayAdmin} />}
                    
                </div>
            </div>

            <div className="navbar flex md:hidden">
                {
                    loggedIn ? (
                        <>
                            <UserButton />
                            <LogoutButton handleLogout={handleLogout} />
                        </>
                    ) : (
                        <LoginButton handleConnexion={handleConnexion} />
                    )
                }

                <ShoppingButton />
                <ShoppingCartButton cart={props.cart} />
                {isAdmin && <AdminButton handleDisplayAdmin={handleDisplayAdmin} />}
            </div>
        </header>
    )
}

export default NavBar;