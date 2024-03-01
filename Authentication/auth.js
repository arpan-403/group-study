const jwt =require("jsonwebtoken");
const model=require("../DataBase/models");
async function auth(req,res,next){
    if(req.cookies.jwt==null){
        res.redirect("/login");
        return;
    }
    let user=await jwt.verify(req.cookies.jwt,"iamagoodboyandasoftwareengineerwww");
    if(user==null){
        console.log("you are not loged in");
        res.redirect("/login");
        return;
    }
    
    req.user=await model.findOne({_id:user._id});
    req.userName=req.user.name;
    console.log(user._id);
    next();
}
module.exports=auth;