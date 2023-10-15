
import { ProductsContext } from "../../context/ProductContext";
import { useState, useEffect,useContext } from "react";
import { useParams } from 'react-router-dom';
import ProductsItemDetail from "./ProductItemDetail";

import { PanierContext } from "../../context/PanierContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ProduitDetail () {

   const Produits  = useContext(ProductsContext)

   const Cart  = useContext(PanierContext)


   const url = useParams()


   const idParams = url.id


   // État pour stocker le panier
   const [panier, setPanier] = useState(Cart);
   

    panier.forEach(o1 => {



      const o2 = Produits.find(o2 =>o2._id === o1.produit._id)



      if (o2 && o1.InPanier !== o2.InPanier) {
      
        // Si un objet correspondant est trouvé et que la valeur de la clé est différente, mettez à jour la valeur
        o2.InPanier = true;
      }

    })
    // Fonction pour ajouter un produit au panier
    const AddPanier = (id, quantite) => {
      const produit = Produits.find(p=>p._id===id)
       
      
      const nouvelArticle = { produit, quantite };

    
      const tooglePanier =  panier.some(p =>p[produit.Nom] === nouvelArticle.Nom)

     if(tooglePanier)
       nouvelArticle.produit.InPanier = true

       const nouveauPanier = [...panier];

       nouveauPanier.push(nouvelArticle)

      
         setPanier(nouveauPanier);  

             // Sérialisez le panier en JSON
       const panierJSON = JSON.stringify(nouveauPanier);


       // Stockez la chaîne JSON dans le localStorage avec une clé (par exemple, "panier")
       localStorage.setItem('panier', panierJSON);

     
       toast.success(`${produit.Nom} a été ajouté au panier !`);

    
 };
 


   return(

       <>

   

       <div className="my-20 lg:flex">

     {Produits.filter(pt=>pt._id ===idParams).map(p=>(

               <ProductsItemDetail 
               key={p._id}
               ProductList={p}
               ProductAddPanier={()=>AddPanier(p._id,1)}


               />
     ))}
       
       

       </div>
       


    
       </>


   )




}