const http=require("http");
const express=require("express");
const app=express();
const {Server}=require("socket.io");
const server=http.createServer(app);
const io=new Server(server);
const ejs=require("ejs");
const auth=require("./Authentication/auth");
app.set("view engine","ejs");
app.use(express.static("public"));
const register=require("./routes/register");
const login=require("./routes/login");
const groups=require("./routes/groups");
const operating=require("./routes/operating");
const compiler=require("./routes/compiler");
app.use("/uploads",express.static("uploads"));
app.use(register);
app.use(login);
app.use(groups);
app.use(operating);
app.use(compiler);
app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/compiler",(req,res)=>{
    res.render("compiler");
})

io.on("connection",(socket)=>{
    socket.on("join",(room)=>{
        socket.join(room);
    })
    socket.on("massage",(data)=>{
        socket.to(data.room).emit("forword",data);
    })
})



server.listen(3000,()=>{console.log("connecting to server...")});