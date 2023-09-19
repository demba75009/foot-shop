import express from 'express';
import UserController from '../controller/users.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
  // Your code here
  
  new UserController().get(req,res)
});
router.post('/add', (req, res) => {
  // Your code here
  console.log("ok");

  
  new UserController().post(req,res)
});


router.post("/connexion",(req,res)=>{

  new UserController().Login(req,res)


})

export default router;
