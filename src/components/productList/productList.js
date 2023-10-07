import { ProductsContext } from "../../context/ProductContext";
import { PanierContext } from "../../context/PanierContext";
import { useState,useContext } from "react";
import ProductsItem from '../productItem/productItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

function ProductList() {
  const Prod  = useContext(ProductsContext)
  const Cart  = useContext(PanierContext)
  const history = useNavigate()

   const [Produits, setProduit] = useState(Prod)
   const [addPanierOk, setaddPanierOk] = useState(false)
   
   console.log(Prod);
    // État pour stocker le panier
    const [panier, setPanier] = useState(Cart);
    
  
    // Fonction pour ajouter un produit au panier
    const AddPanier = (id, quantite) => {
         const produit = Produits.find(p=>p._id===id)
          
          const nouvelArticle = { produit, quantite };

          console.log(nouvelArticle);
        
          const tooglePanier =  panier.some(p =>p[produit.Nom] === nouvelArticle.Nom)
          console.log(tooglePanier);
  
         if(tooglePanier)
           nouvelArticle.produit.InPanier = true
  
  
          setPanier([...panier, nouvelArticle]);

              // Sérialisez le panier en JSON
        const panierJSON = JSON.stringify(panier);

        // Stockez la chaîne JSON dans le localStorage avec une clé (par exemple, "panier")
        localStorage.setItem('panier', panierJSON);

      
        toast.success(`${produit.Nom} a été ajouté au panier !`);

       

    };
    

   function Detail(id){


    history(`/Product/${id}`)


  }


  




   return (
   <>
      <h1 className='text-center'> Foot-shop </h1>
    <div className='mt-5 d-flex flex-wrap justify-content-evenly'>
    
    
    
    {Produits.map(p=>(


        <ProductsItem
      
      ProductList = {p}
      ProductDetailAction={()=>Detail(p._id)}
      ProductAddPanier={()=>AddPanier(p._id,1)}

      />


    ))}
      <ToastContainer />

          </div>
  </>

  );
}

export default ProductList;
