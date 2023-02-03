const express=require('express')
const dotenv=require('dotenv')
const app=express();
const cors=require('cors');
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const db=require("./mongodb/connect.js")
const imageurl=require('./scema/photo')
const sucess=false;
console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const port=process.env.PORT;
app.use(cors());
app.use(express.json());
db();
app.get('/',(req,res)=>{
    res.send("server is running");
})
app.post('/',async(req,res)=>{
  const prompt= await req.body.prompt;
  console.log(prompt);
try {
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    response_format:"b64_json"
  });
  const image_url = response.data.data[0].b64_json;
  res.send({img:image_url});
} catch (error) {
  console.log(error)
}
  
})
app.post('/photo',async(req,res)=>{
  try {
    
    const {image,title}=await req.body;
    console.log(image)
    const images=await imageurl.create({
      title,
      image_url:image
    })
    await images.save();
    sucess=true;
    res.send(sucess);
  } catch (error) {
    console.log("mistake by devloper")
  }
})
app.get('/images',async(req,res)=>{
  try {
    const data=await imageurl.find({});
    res.send(data);
  } catch (error) {
    console.log(error)
  }
})
app.listen(port,()=>{console.log('connection sucessfull')});