const express=require("express");
const router=express.Router();
const cookie=require("cookie-parser");
const model=require("../DataBase/models");
router.use(express.urlencoded({extended:false}));
router.use(cookie());
router.get("/login",(req,res)=>{
    res.render("login");
})
router.post("/login",async(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    let document=await model.findOne({email:email});
    console.log(document);
    if(document===null){
        res.redirect("/register");
        return;
    }else
    {
        let val=await document.checkPassword(password);
        console.log(val);
        if(!val){
            console.log("in login");
            res.redirect("/login");
            return;
        }else{
            let token=await document.generateToken();
            await res.cookie("jwt",token,{
                maxAge:24*60*60*1000
            });
            res.redirect("/groups");
        }
    }
    

})
module.exports=router;