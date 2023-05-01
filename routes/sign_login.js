const express=require("express");
const app=express();
const routes=express.Router();
const signup_controller=require("../controller/signup.js")

routes.post("/signup",signup_controller.signup);
routes.post("/signupApi",signup_controller.signupApi);




module.exports=routes;