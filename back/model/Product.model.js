import mongoose from "mongoose";
const schema = mongoose.Schema;

const product = schema({
    Nom:String,
    Prix: Number,
    Image: Array,
    Description:String,
    Stock:Number,
  
});



const Product = mongoose.model("Products", product);

export default Product;