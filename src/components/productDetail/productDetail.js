
import { ProductsContext } from "../../context/ProductContext";
import { useState, useEffect,useContext } from "react";
import { useParams } from 'react-router-dom';
import ProductsItemDetail from "./ProductItemDetail";




export default function ProduitDetail () {

   const Produits  = useContext(ProductsContext)



   const url = useParams()


   const idParams = url.id




   return(

       <>

   

       <div className="my-20 lg:flex">

     {Produits.filter(pt=>pt._id ===idParams).map(p=>(

               <ProductsItemDetail 
               key={p._id}
               ProductList={p}

               />
     ))}
       
       </div>

    
       </>


   )




}