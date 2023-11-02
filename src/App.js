import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Profil,ProductList,AddProduct,ProductDetail,Panier,Inscription,Connexion,Checkout,ResultatRecherche, RechercheEnCour,Acceuil} from './feature/index';
import TheHeader from './components/theHeader/theHeader';
import React, { useState,useContext } from 'react';
import { ProductsContext } from "./context/ProductContext";
import Footer from './components/footer/footer';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const Prod  = useContext(ProductsContext)
  const [Produits, setProduit] = useState(Prod)
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsClick, setSearchResultsClick] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const closeResults = () => {
    setShowResults(false);
  };

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
  const handleSearchClick = (term) => {
    setSearchTerm(term);
    if(term !==""){
    const filteredResults = Produits.filter((product) =>
    product.Nom.toLowerCase().includes(term.toLowerCase())

    
  )
  setShowResults(true)

  setSearchResultsClick(filteredResults);
  setSearchResults([]);


    }
    else{
      setSearchResults([]);
      setSearchResultsClick([]);



    }

  };

  function ProduitDetail(term){

    term =""
    setSearchResults([]);
    setShowResults(false)



  }

 

  return (
    <Router>
      <TheHeader handleSearch={handleSearch} results={searchResults} clickResult={handleSearchClick} />
      <ResultatRecherche Detail={ProduitDetail} results={searchResultsClick} show1={showResults} closeResult={closeResults} />

      <RechercheEnCour Detail={ProduitDetail} results={searchResults}  />

 
      <Routes>

      <Route  path="/" element={<Acceuil />} />
      <Route  path="/produit" element={<ProductList />} />
      <Route  path="/profil" element={<Profil />} />
      <Route  path="/Panier" element={<Panier/>} />
      <Route  path="/Product/:id" element={<ProductDetail/>} />
      <Route  path="/add" element={<AddProduct/>} />
      <Route  path="/signup" element={<Inscription/>} />
      <Route  path="/signin" element={<Connexion/>} />
      <Route  path="/checkout" element={<Checkout/>} />

        
      </Routes>    

      <Footer />

    </Router>
  );
}

export default App;
