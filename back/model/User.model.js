import mongoose from "mongoose";
const schema = mongoose.Schema;

const user = schema({
    Username:String,
    Nom:String,
    Prenom:String,
    DateBirth:String,
    Ville:String,
    Mobile:String,
    Email: String,
    Password: String,
    Commande:Array
  
  
});



const User = mongoose.model("Users", user);

export default User;