import './App.css';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Navigate,
  Routes
} from "react-router-dom";

import Accueil from "./pages/accueil/Accueil";
import Shopping from "./pages/shopping/Shopping";
import Produit from "./pages/produit/Produit";
import Panier from "./pages/panier/Panier";
import Contact from "./pages/contact/Contact";
import NavBar from "./pages/commons/Navbar";
import Footer from "./pages/commons/Footer";

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/produit/:id" element={<Produit />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
