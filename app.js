

const express=require("express");
const app=express();
const port=4200;
//parsing form data using bodyparser 
const body_parser=require("body-parser")
app.use(body_parser.urlencoded({extended:false}))
// console.log(body_parser)
app.use(express.json())//it parse axios post data
const cors=require("cors")//it cors rule for api
app.use(cors())

//login signup  expense route
const user_route=require("./routes/sign_login.js")

app.use("/user",user_route)

//transction route

const transction_route=require("./routes/transaction_route.js")

app.use("/buyPremium",transction_route)

//user data sender route


const user_data_sender_route=require("./routes/userDataSender.js")

app.use("/userData",user_data_sender_route)


//testing
// app.post("/data",(req,res)=>{
//     console.log(req.body)
//     res.redirect("http://localhost:5500/view/")
// })


//database part
//relation part
const db=require("./database.js");
const db_expense=require("./db_model/expense_record.js");
const db_user=require("./db_model/login_user.js");
const transaction_model=require("./db_model/transaction_model.js");

const forget_password_model=require("./db_model/forget_password_record.js");

db_user.hasMany(db_expense)
db_expense.belongsTo(db_user)

db_user.hasMany(transaction_model)
transaction_model.belongsTo(db_user)

db_user.hasMany(forget_password_model);
forget_password_model.belongsTo(db_user);





// db.sync({force:true})
db.sync()
.then(a=>{
    console.log("login model or created in db->","from:app.js,login model sucessful")

})
.catch(a=>{console.log(a,"err in db.sync app.js")})


app.listen(port,()=>{
    console.log("port has been started at port",port)
})

