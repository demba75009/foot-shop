import {createContext, useState}  from "react"



let products = []

async function getProduct(){

    const ProductRequest = await  fetch("http://localhost:5000/products",{method:"GET"})
  
    const prod = await ProductRequest.json()

    prod.forEach(element => {
      
      element.InPanier = false

    });

    
    products = prod
    

    return products
    
    
      }

       

     const Products = await getProduct()
      
     

     
     

export const  ProductsContext = createContext(Products) 