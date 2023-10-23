import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {ProductList,AddProduct,ProductDetail,Panier,Inscription,Connexion,Checkout,ResultatRecherche} from './feature/index';
import TheHeader from './components/theHeader/theHeader';
import React, { useState,useContext } from 'react';
import { ProductsContext } from "./context/ProductContext";


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const Prod  = useContext(ProductsContext)
  const [Produits, setProduit] = useState(Prod)
  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = (term) => {
    setSearchTerm(term);
    if(term !==""){
    const filteredResults = Produits.filter((product) =>
    product.Nom.toLowerCase().includes(term.toLowerCase())
    
  )
  setSearchResults(filteredResults);
    }
    else{
      setSearchResults([]);


    }

  };

  function ProduitDetail(term){

    term =""
    setSearchResults([]);


  }



  return (
    <Router>
      <TheHeader handleSearch={handleSearch} results={searchResults} />
      <ResultatRecherche Detail={ProduitDetail} results={searchResults} />

 
      <Routes>

      <Route  path="/" element={<ProductList />} />
      <Route  path="/Panier" element={<Panier/>} />
      <Route  path="/Product/:id" element={<ProductDetail/>} />
      <Route  path="/add" element={<AddProduct/>} />
      <Route  path="/signup" element={<Inscription/>} />
      <Route  path="/signin" element={<Connexion/>} />
      <Route  path="/checkout" element={<Checkout/>} />

        
      </Routes>      
    </Router>
  );
}

export default App;
