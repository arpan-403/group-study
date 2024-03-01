const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
mongoose.connect("mongodb://localhost:27017/collage_database");

const schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String
        }
    }]
})
schema.methods.encryptPassword=async function(){
    let newPassword=await bcrypt.hash(this.password,11);
    console.log(this.email);
    
    await model.updateOne({_id:this._id},{$set:{password:newPassword}});
    
}
schema.methods.checkPassword=async function(password){
    console.log("in check");
    return await bcrypt.compare(password,this.password);
}
schema.methods.generateToken=async function(){
    let token=await jwt.sign({_id:this._id},"iamagoodboyandasoftwareengineerwww",);
    console.log(token);
    this.tokens.push({token:token});
    await model.updateOne({_id:this._id},{$set:{tokens:this.tokens}});
    return token;
}
const model=new mongoose.model("users",schema);
module.exports=model;