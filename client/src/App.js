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

function App() {

  const url = "http://127.0.0.1:8000/categories";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      axios.get(url)
          .then((response) => {
            console.log(response.data);
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
          <Route path="/" element={<Accueil />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/produit" element={<Produit />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="*" element={<Accueil />} />
          {categories.map(category => (
            <Route
              key={category.id}
              path={`/categories/${category.id}`}
              element={ <Categories title={category.name} />}
            />
          ))}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
