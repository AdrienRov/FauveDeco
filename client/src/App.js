import './App.css';

import React, { useEffect, useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Navigate,
  Routes
} from "react-router-dom";
import axios, { Axios } from 'axios';
import Accueil from "./pages/accueil/Accueil";
import Shopping from "./pages/shopping/Shopping";
import Produit from "./pages/produit/Produit";
import Panier from "./pages/panier/Panier";
import Contact from "./pages/contact/Contact";
import NavBar from "./pages/commons/NavBar";
import Burger from "./pages/commons/Burger";
import Footer from "./pages/commons/Footer";
import Categories from "./pages/categories/Categories";
import Connexion from "./form/Connexion";
import Inscription from "./form/Inscription";
import User from './pages/user/User';

function App() {

  const urlCategories = "http://127.0.0.1:8000/categories";

  const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios.get(urlCategories)
			.then((response) => {
				setCategories(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

  const [cart, setCart] = useState(() => localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
  useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <NavBar />
      <div>
        <Routes>

          <Route path='/' element={<Accueil categories={categories} />} />
          <Route path="/accueil" element={<Accueil categories={categories} />} />
          <Route path="/shopping" element={<Shopping cart={cart} setCart={setCart} />} />
          <Route path="/panier" element={<Panier cart={cart} setCart={setCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/categories/:id" element={<Categories categories={categories} cart={cart} setCart={setCart} />} />
          <Route path="/categories" element={<Categories categories={categories} />} />
          <Route path="/produit/:id" element={<Produit cart={cart} setCart={setCart} />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<Accueil />} />
          

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
