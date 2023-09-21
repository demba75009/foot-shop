import mongoose from "mongoose"


mongoose.connect("mongodb+srv://donkey:dembaleboss@cluster0.m3r9p.mongodb.net/Foot-Shop?retryWrites=true&w=majority").then(res=>console.log("connectez"))

export default  mongoose