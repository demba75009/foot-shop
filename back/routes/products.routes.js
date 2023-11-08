import express from 'express';
import ProductController from '../controller/products.controller.js';

const router = express.Router();

router.get('/products', (req, res) => {
  // Your code here
   
  new ProductController().get(req,res)
});
router.get('/products1', (req, res) => {
  // Your code here
   
res.send("ok")

});

router.get('/products/:value', (req, res) => {
  // Your code here

    new ProductController().getSearch(req,res)

  
});
router.post('/products/add', (req, res) => {
  // Your code here

  
  new ProductController().post(req,res)
});
router.post('/products/addPanier', (req, res) => {
  // Your code here

  
  new ProductController().postPanier(req,res)
});

router.post('/products/paiement', (req, res) => {
  // Your code here

  console.log("ok");
  
  new ProductController().paiement(req,res)
});




export default router;
