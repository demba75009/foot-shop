
import Product from "../model/Product.model.js";
import User from "../model/User.model.js";

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

      const { token, montant,client,Commande,user } = req.body;
      const idCommande = Math.floor(Math.random() * 1000000)

      user[0].Commande.push({CommandeList:Commande,idCommande})

      console.log(user);
      const id = user[0]._id
      const newData = {
        Username:user[0].Username,
        Email:user[0].Email,
        Password:user[0].Password,
        Commande:user[0].Commande,
      }



      try {
       
        
        const clientStripe = await stripe.customers.create({
          name: `${client.nom} ${client.prenom}`, // Extrayez le nom du client des métadonnées du token.
          email: client.email, // Extrayez le nom du client des métadonnées du token.
          address:client.adressse,
                

        });


        const charge = await stripe.charges.create({
          source: token,          
          amount: montant * 100, // Le montant en centimes, par exemple 1000 pour 10 €.
          currency: 'EUR', // La devise à utiliser.
          description: `Foot-shop: ${client.nom} ${client.prenom} commande n ° ${idCommande} `,
          
        });
        const result = await User.findOneAndUpdate({ _id: id }, newData, { new:true  });


        // Le paiement a réussi, renvoyez une réponse appropriée.
        res.json({ success: true, charge,clientStripe,idCommande });
      } catch (error) {
        console.log(error);
        // Le paiement a échoué, renvoyez une réponse d'erreur.
        res.json({ success: false, error: "Le paiement a été refusé" });
      }




    }
      

}


export default  ProductController