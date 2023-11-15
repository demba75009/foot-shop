import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Profil,ProductList,AddProduct,ProductDetail,Panier,Inscription,Connexion,Checkout,ResultatRecherche, RechercheEnCour,Acceuil} from './feature/index';
import TheHeader from './components/theHeader/theHeader';
import React, { useState,useContext,useEffect } from 'react';
import { ProductsContext } from "./context/ProductContext";
import Footer from './components/footer/footer';
import { PanierContext } from "./context/PanierContext";
import { userContext } from "./context/UserContext";


function App() {

  const User  = useContext(userContext)
  const [user, setUser] = useState(User);


  const Cart  = useContext(PanierContext)
  const [panier, setPanier] = useState(Cart);


  const [searchTerm, setSearchTerm] = useState('');
  const Prod  = useContext(ProductsContext)
  const [Produits, setProduit] = useState(Prod)
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsClick, setSearchResultsClick] = useState([]);
  const [showResults, setShowResults] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      // Revenir en haut de la page
      window.scrollTo(0, 0);
    };

    // Ajouter un écouteur d'événement pour détecter les changements de page
    window.addEventListener('popstate', handleScroll);

    // Nettoyer l'écouteur d'événement lors de la suppression du composant
    return () => {
      window.removeEventListener('popstate', handleScroll);
    };
  }, []); // Le tableau vide signifie que cet effet ne dépend d'aucune variable, il s'exécute une seule fois


  const updatePanier = (newPanier) => {
    setPanier(newPanier);
  };


  const updateUser = (newUser) => {
    setUser(newUser);
  };


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
    <div className='App'>
    
    <Router >

      <TheHeader userTrue={user} panierLength = {panier}  handleSearch={handleSearch} results={searchResults} clickResult={handleSearchClick} />
      <ResultatRecherche Detail={ProduitDetail} results={searchResultsClick} show1={showResults} closeResult={closeResults} />

      <RechercheEnCour Detail={ProduitDetail} results={searchResults}  />

 
      <Routes>

      <Route  path="/" element={<Acceuil />} />
      <Route  path="/produit" element={<ProductList updatePanier={updatePanier} />} />
      <Route  path="/profil" element={<Profil />} />
      <Route  path="/Panier" element={<Panier updatePanier={updatePanier} Panier = {panier}/>} />
      <Route  path="/Product/:id" element={<ProductDetail updatePanier={updatePanier}/>} />
      <Route  path="/add" element={<AddProduct/>} />
      <Route  path="/signup" element={<Inscription/>} />
      <Route  path="/signin" element={<Connexion updateUser={updateUser}  />} />
      <Route  path="/checkout" element={<Checkout Panier = {panier} updateUser={user}/>} />

        
      </Routes>    


          <Footer />



    </Router>
    </div>

  );
}

export default App;
