const express=require("express");
const router=express.Router();
const auth=require("../Authentication/auth");
router.get("/groups",auth,(req,res)=>{
    res.render("gallery");
})
module.exports=router;