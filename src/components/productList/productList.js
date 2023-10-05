import { ProductsContext } from "../../context/ProductContext";
import { PanierContext } from "../../context/PanierContext";
import { useState,useContext } from "react";
import ProductsItem from '../productItem/productItem';


import { useNavigate } from 'react-router-dom';

function ProductList() {
  const Prod  = useContext(ProductsContext)
  const Cart  = useContext(PanierContext)
  const history = useNavigate()

   const [Produits, setProduit] = useState(Prod)
   
    // État pour stocker le panier
    const [panier, setPanier] = useState(Cart);
  
    // Fonction pour ajouter un produit au panier
    const AddPanier = (id, quantite) => {
         const produit = Produits.find(p=>p._id===id)
          
          const nouvelArticle = { produit, quantite };

          console.log(nouvelArticle);

          setPanier([...panier, nouvelArticle]);

              // Sérialisez le panier en JSON
        const panierJSON = JSON.stringify(panier);

        // Stockez la chaîne JSON dans le localStorage avec une clé (par exemple, "panier")
        localStorage.setItem('panier', panierJSON);

   


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
          
          </div>
  </>

  );
}

export default ProductList;
