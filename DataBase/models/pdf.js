const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
mongoose.connect("mongodb://localhost:27017/collage_database");

const schema=mongoose.Schema({
    "name":{
        type:String,
        required:true
    },
    "room":{
        type:String,
        required:true
    },
    "path":{
        type:String,
        required:true
    }
})

const model=new mongoose.model("pdfs",schema);
module.exports=model;