import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import * as ReactDom from "react-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from 'axios';


const fixPrice = (price) => {
    if (typeof price !== "number") {
        price = parseFloat(price);
    }
    return price.toFixed(2);
}

const SidePanel = (props) => {

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const { step, setStep, cart, setCart } = props;

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(user?.email ?? "");
    const [firstName, setFirstName] = useState(user?.firstName ?? "");
    const [lastName, setLastName] = useState(user?.lastName ?? "");
    const [address, setAddress] = useState(user?.address ?? "");
    const [country, setCountry] = useState(user?.country ?? "");
    const [typeLivraison, setTypeLivraison] = useState("click-collect");

    useEffect(() => {
        if (!loading) {
            return;
        }
        const data = {
            products: cart.map((produit) => {
                return {
                    id: produit.id,
                    quantity: produit.buy_quantity
                }
            }),
            shippingdata: {
                email: email,
                firstname: firstName,
                lastname: lastName,
                address: address,
                country: country
            },
            type: typeLivraison === "click-collect" ? 2 : 1

        };

        console.log(data)

        axios.post('http://localhost:8000/purchase', data).then((response) => {
            if (response.data.status !== true) {
                setLoading(false);
                setStep(5);
            } else {
                setLoading(false);
                setStep(4);
                setCart([]);
            }
        }).catch((error) => {
            setLoading(false);
            setStep(5);
            console.log(error);
        })
    }, [loading]);

    const verifyStep = () => {
        switch (step) {
            case 1:
                if (cart.length < 1)
                    return false;
                if (cart.some((produit) => produit.buy_quantity > produit.quantity))
                    return false;
                return true;
                break;
            case 2:
                if (user !== null)
                    return true;
                if (email.length < 2)
                    return false;
                if (firstName.length < 2)
                    return false;
                if (lastName.length < 2)
                    return false;
                if (address.length < 2)
                    return false;
                if (country.length < 2)
                    return false;
                return true;
                break;
            default:
                return false;
                break;
        }
    }

    switch (step) {
        case 1:
            // Total et boutton confirmer
            return (<>
                <div class="mb-2 flex justify-between">
                    <p class="text-gray-700">Total</p>
                    <p class="text-gray-700">{fixPrice(cart.reduce((a, c) => a + c.buy_quantity * c.price, 0))}€</p>
                </div>
                <div class="flex justify-between">
                    <p class="text-gray-700">Livraison</p>
                    <p class="text-gray-700">Gratuite</p>
                </div>
                <hr class="my-4" />
                <div class="flex justify-between">
                    <p class="text-lg font-bold">Total</p>
                    <div class="">
                        <p class="mb-1 text-lg font-bold">{fixPrice(cart.reduce((a, c) => a + c.buy_quantity * c.price, 0))}€</p>
                        <p class="text-sm text-gray-700">TVA incluse</p>
                    </div>
                </div>
                <button class="mt-6 w-full btn-confirmer duration-100 py-1.5 font-medium" onClick={() => setStep(2)} disabled={!verifyStep()}>Confirmer la commande</button>
            </>)

            break;
        case 2:
            const isLogged = user !== null;
            return (<>

                <div class="mb-2 flex justify-between">
                    <p class="text-gray-700">Adresse de livraison</p>
                </div>

                <input type="text" placeholder="Email" class="my-2 w-full bg-gray-100 py-1.5 px-2 font-medium text-gray-700 hover:bg-gray-200" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLogged} />
                <input type="text" placeholder="Prénom" class="my-2 w-full bg-gray-100 py-1.5 px-2 font-medium text-gray-700 hover:bg-gray-200" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={isLogged} />
                <input type="text" placeholder="Nom" class="my-2 w-full bg-gray-100 py-1.5 px-2 font-medium text-gray-700 hover:bg-gray-200" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={isLogged} />
                <input type="text" placeholder="Adresse" class="my-2 w-full bg-gray-100 py-1.5 px-2 font-medium text-gray-700 hover:bg-gray-200" value={address} onChange={(e) => setAddress(e.target.value)} disabled={isLogged} />
                <input type="text" placeholder="Pays" class="my-2 w-full bg-gray-100 py-1.5 px-2 font-medium text-gray-700 hover:bg-gray-200" value={country} onChange={(e) => setCountry(e.target.value)} disabled={isLogged} />

                <hr class="my-4" />

                <div class="mb-2 flex justify-between">
                    <p class="text-gray-700">Type de livraison</p>
                </div>

                <div class="flex">
                    <input type="radio" class="mx-4" id="click-collect" name="type-livraison" value="click-collect" {...typeLivraison === "click-collect" && "checked"} onChange={(e) => setTypeLivraison(e.target.value)} checked />
                    <label for="click-collect">Click and collect</label>
                </div>

                <div class="flex">
                    <input type="radio" class="mx-4" id="livraison-domicile" name="type-livraison" value="livraison-domicile" {...typeLivraison === "livraison-domicile" && "checked"} onChange={(e) => setTypeLivraison(e.target.value)} />
                    <label for="livraison-domicile">Livraison à domicile</label>
                </div>

                <button class="mt-6 w-full py-1.5 font-medium  btn-confirmer duration-100" onClick={() => { setStep(3); setLoading(true); }} disabled={!verifyStep()}>Continuer</button>
            </>)

            break;
        case 3:
            return (
                <LoadingSpinner />
            )
            break;
        case 4:
            // success
            return (
                <>
                    <div class="mb-2 flex justify-between">
                        <p class="text-gray-700">Votre commande a été validée</p>
                    </div>
                    <Link to="/"><button class="mt-6 w-full py-1.5 font-medium  btn-confirmer duration-100">Retour à l'accueil</button></Link>
                </>
            )
            break;
        case 5:
            // error
            return (
                <>
                    <div class="mb-2 flex justify-between">
                        <p class="text-gray-700">Une erreur est survenue</p>
                    </div>
                    <button class="mt-6 w-full py-1.5 font-medium  btn-confirmer duration-100" onClick={() => { setStep(3); setLoading(true); }}>Réessayer</button>
                </>
            )
            break;

        default:
            return (
                <>Erreur</>
            )
            break;
    }
}


function Panier(props) {

    const { cart, setCart } = props;
    const [step, setStep] = useState(1);

    const removeFromCart = (produit) => {
        if (step != 1)
            return;
        const exist = cart.find((x) => x.id === produit.id);
        if (exist) {
            setCart(cart.filter((x) => x.id !== produit.id));
        }
    }

    const changeQuantity = (produit, quantity) => {
        if (step != 1)
            return;
        if (typeof quantity !== "number") {
            quantity = parseInt(quantity);
        }
        if (quantity < 1) {
            return;
        }
        const exist = cart.find((x) => x.id === produit.id);
        if (exist) {
            setCart(
                cart.map((x) =>
                    x.id === produit.id ? { ...exist, buy_quantity: quantity } : x
                )
            );
        }
    }





    return (
        <div className="py-7">
            <h1 class="mb-10 text-center text-2xl font-bold">Panier</h1>
            <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">

                <div class="md:w-2/3">
                    {cart.map((produit) => (
                        <div class="justify-between mb-6 bg-white p-6 shadow-md sm:flex sm:justify-start">
                            <img src={produit.images[0]?.url} alt="product-image" class="w-full sm:w-40" />
                            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <Link to={`/produit/${produit.id}`}>
                                    <div class="mt-5 sm:mt-0">
                                        <h2 class="text-lg font-bold text-gray-900">{produit.name}</h2>
                                        <p class="mt-1 text-xs text-gray-700">{fixPrice(produit.price)}€</p>
                                        <p class="mt-1 text-xs text-gray-700">{produit.category.name}</p>
                                    </div>
                                </Link>
                                <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                    <div class="flex items-center border-gray-100">
                                        <button class="cursor-pointer btn-ajout-retrait py-1 px-3.5 duration-100" onClick={() => changeQuantity(produit, produit.buy_quantity - 1)}>-</button>
                                        <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={produit.buy_quantity} min="1" max={produit.quantity} onChange={(e) => changeQuantity(produit, e.target.value)} />
                                        <button class="cursor-pointer btn-ajout-retrait py-1 px-3.5 duration-100" onClick={() => changeQuantity(produit, produit.buy_quantity + 1)}>+</button>
                                    </div>
                                    <div class="flex items-center space-x-4">
                                        <p class="text-sm">{fixPrice(produit.buy_quantity * produit.price)}€</p>
                                        <button class="text-red-500 hover:text-red-600" onClick={() => removeFromCart(produit)}>
                                            <svg class="w-[23px] h-[23px] fill-[#063300]" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>))}

                </div>

                <div class="mt-6 h-full border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <SidePanel step={step} setStep={setStep} cart={cart} setCart={setCart} />
                </div>
            </div>
        </div>
    )
}

export default Panier;