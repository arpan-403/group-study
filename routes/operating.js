const express=require("express");
const router=express.Router();
const multer=require("multer");
const auth=require("../Authentication/auth");
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
router.get("/operating",auth,async(req,res)=>{
    let documents=await model.find({"room":"operating"}).select({path:1,_id:0});
    let arr=[];
    for(let i=0;i<documents.length;i++){
        arr.push(documents[i].path);
    }
    console.log(arr);
    res.render("operating",{documents:arr,user:req.userName});
})
router.post("/operating",upload.single("pdf"),async(req,res)=>{
    await model.create({
        name:req.file.filename,
        room:"operating",
        path:req.file.path
    })
    console.log("file uploaded");
    
    res.redirect("/operating");
})


module.exports=router;