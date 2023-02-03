const mongoose=require("mongoose");
const photourl=new mongoose.Schema({
    title:{
       type:String,
       required:true
    },
    image_url:{
       type:String,
       required:true
    }
})
const imageurl=new mongoose.model("Photo",photourl);
module.exports=imageurl;