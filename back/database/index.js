import mongoose from "mongoose"

import dotenv from 'dotenv';

dotenv.config();


mongoose.connect(process.env.MONGODB_URL).then(res=>console.log("connectez"))

export default  mongoose