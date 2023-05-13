const express=require("express");
const app=express();
const routes=express.Router();
const signup_controller=require("../controller/signup.js")
const login_controller=require("../controller/loginController.js")
const transaction_controller=require("../controller/transaction_cntrl.js");
const authenthicate=require("../auth/userAuth.js")


routes.get("/",transaction_controller.create_transaction)
routes.post("/",authenthicate.authenticate_user,transaction_controller.transaction_response)
// routes.get("/",authenthicate.authenticate_user,transaction_controller.create_transaction)














module.exports=routes;