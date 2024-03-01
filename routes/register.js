const express=require("express");
const router=express.Router();
const cookie=require("cookie-parser");
router.use(cookie());
const model=require("../DataBase/models");
router.use(express.urlencoded({extended:false}));
router.get("/register",(req,res)=>{
    res.render("register");
})
router.post("/register",async(req,res)=>{
    console.log(req.body);
    const {name,collage,email,password}=req.body;
    let document=new model({
        name,collage,email,password
    })
    await model.insertMany(document);
    await document.encryptPassword();
    let token=await document.generateToken();
    await res.cookie("jwt",token,{
        maxAge:24*60*60*1000
    });
    res.redirect("/groups");
})
module.exports=router;