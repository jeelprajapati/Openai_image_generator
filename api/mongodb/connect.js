const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const db=()=>{mongoose.connect(process.env.MONGO_URL,()=>{console.log('connection successful')})};


module.exports=db;