
import Product from "../model/Product.model.js";


import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51NLncNCV4GRE9vPYiMG91UHCOwFrZxLsdPIxdePDgxd1eZeu5zSUbemiY59wSzfmuHMBm3S2PaG0t3IKNbbQpJoW009iW5ARiH');


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

      const { token, montant,client } = req.body;

      const idCommende = Math.floor(Math.random() * 1000000)


      try {
        const charge = await stripe.charges.create({
          source: token,          
          amount: montant * 100, // Le montant en centimes, par exemple 1000 pour 10 €.
          currency: 'EUR', // La devise à utiliser.
          description: `Foot-shop commande n ° ${idCommende} `,
          metadata: {
            clientName: client[0].Username, // Extrayez le nom du client des métadonnées du token.
          },
        });
        
        const clientStripe = await stripe.customers.create({
          name: client[0].Username,
          
        });

        // Le paiement a réussi, renvoyez une réponse appropriée.
        res.sendStatus(200);
      } catch (error) {
        console.log(error);
        // Le paiement a échoué, renvoyez une réponse d'erreur.
        res.sendStatus(500);
      }




    }
      

}


export default  ProductController