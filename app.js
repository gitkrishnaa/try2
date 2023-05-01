const db=require("./db_model/login_user.js");
const express=require("express");
const app=express();
const port=4200;
//parsing form data using bodyparser 
const body_parser=require("body-parser")
app.use(body_parser.urlencoded({extended:false}))
console.log(body_parser)
app.use(express.json())//it parse axios post data
const cors=require("cors")//it cors rule for api
app.use(cors())
const user_route=require("./routes/sign_login.js")

app.use("/user",user_route)






//testing
// app.post("/data",(req,res)=>{
//     console.log(req.body)
//     res.redirect("http://localhost:5500/view/")
// })


db.sync()
.then(a=>{
    console.log("login model or created in db->","from:app.js,login model")

})
.catch(a=>{console.log(a,"err in db.sync app.js")})


app.listen(port,()=>{
    console.log("port has been started at port",port)
})