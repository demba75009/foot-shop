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
   
   console.log(Produits);

    // État pour stocker le panier
    const [panier, setPanier] = useState(Cart);

    // console.log(panier);

    // panier.forEach(o1 => {

    //   const o2 = Produits.find(o2 =>o2[o2.InPanier] === o1[o1.produit.InPanier])


    //   if (o2 && o1.InPanier !== o2.InPanier) {
    //     console.log("true");
    //     console.log(o2);
    //     // Si un objet correspondant est trouvé et que la valeur de la clé est différente, mettez à jour la valeur
    //     o2.InPanier = true;
    //   }

    // })

  
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
