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
import axios from 'axios';
import Accueil from "./pages/accueil/Accueil";
import Shopping from "./pages/shopping/Shopping";
import Produit from "./pages/produit/Produit";
import Panier from "./pages/panier/Panier";
import Contact from "./pages/contact/Contact";
import NavBar from "./pages/commons/NavBar";
import Footer from "./pages/commons/Footer";
import Categories from "./pages/categories/Categories";
import Connexion from "./form/Connexion";
import Inscription from "./form/Inscription";

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

  return (
    <Router>
      <NavBar />
      <div>
        <Routes>

          <Route path='/' element={<Accueil categories={categories} />} />
          <Route path="/accueil" element={<Accueil categories={categories} />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/produit" element={<Produit />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/categories/:id" element={<Categories categories={categories} />} />
          <Route path="/categories" element={<Categories categories={categories} />} />
          <Route path="*" element={<Accueil />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
