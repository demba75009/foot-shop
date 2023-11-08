
import User from "../model/User.model.js";

import jwt from "jsonwebtoken"
 class UserController{
 

   async get(req,res) {

       const users = await User.find({}).exec()

       
       console.log(users);


    }
   async post(req,res) {

        const user = req.body
        user.Cart = []

        const userAuth = await User.findOne({Email:user.Email}).exec()

        if(userAuth){
          return res.json("errorEmail")

        }

        const userAuthPseudo = await User.findOne({Username:user.Username}).exec()

        if(userAuthPseudo){
          return res.json("errorPseudo")

        }
       const users =  new User(user)
       users.save()

       console.log(users);
     return  res.json( users)

       
    }
   async Login(req,res) {

        const user = req.body

        const userAuth = await User.findOne({Email:user.Email}).exec()
        
        console.log(userAuth);
        if(userAuth)
        {
          
            if(`${userAuth.Password}` === user.Password)
            {

              const token = jwt.sign({ userAuth }, 'rjhrfejkfjezfoijflkzefklfeze4554');

            return res.json({userAuth,token})

            }

            
            else 
             return res.json("error")
        
        }
        else
         return res.json("error")


    //    const users =  new User(user)
    //    users.save()

    //    console.log(users);
    //  return  res.json( users)

       
    }

}


export default  UserController