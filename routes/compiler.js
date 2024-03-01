const express=require("express");
const router=express.Router();
const multer=require("multer");
const model=require("../DataBase/models/pdf");
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`);
    }
})
const upload= multer({storage:storage});
router.get("/compiler",async(req,res)=>{
    let documents=await model.find({room:"compiler"}).select({path:1,_id:0});
    let arr=[];
    for(let i=0;i<documents.length;i++){
        arr.push(documents[i].path);
    }
    console.log(arr);
    res.render("compiler",{documents:arr});
})
router.post("/compiler",upload.single("pdf"),async(req,res)=>{
    await model.create({
        name:req.file.filename,
        room:"compiler",
        path:req.file.path
    })
    console.log("file uploaded");
    
    res.redirect("/compiler");
})


module.exports=router;