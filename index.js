const express=require('express');
const path=require('path');
const mdb=require('mongoose');
const dotenv=require('dotenv');
const Signup=('/module')
const app=express();
dotenv.config();
app.use(express.json());

mdb.connect(process.env.MONGODB_URL).then(()=>{console.log("conntected")}).catch((e)=>{console.log("not conntected")})
app.get('/static',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
})
app.get('/',(req,res)=>{
    res.send("Welcome to backend my friend...\n this is backend process area");
})
app.post('/signup',(req,res)=>{
    const {firstname,lastname,email,password}=req.body;
    console.log(firstname,lastname,email,password);
    res.json("values resivied");
})
app.listen(3001,()=>{
    console.log("My Server Started");
}); 