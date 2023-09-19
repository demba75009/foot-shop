
import Product from "../model/Product.model.js";


import stripe from 'stripe';
import { stripeSecretKey } from '../config/config.js';

class ProductController{


   async get(req,res) {

       const Products = await Product.find({}).exec()

       console.log(Products);

       return res.json(Products)

    }
   async post(req,res) {

    const Produit = req.body

    const Products = new Product(Produit)

    Products.save()

       

       return res.json(Products)

    }

    async getSearch(req,res){

      const Products = await Product.find({"Nom":{$regex: req.params.value}}).exec()

      console.log(Products);

      return res.json(Products)

    }

    async paiement(req,res){

      console.log(stripeSecretKey);


      return res.json(stripeSecretKey)




    }
      

}


export default  ProductController