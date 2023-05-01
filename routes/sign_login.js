const express=require("express");
const app=express();
const routes=express.Router();
const signup_controller=require("../controller/signup.js")
const login_controller=require("../controller/loginController.js")

routes.post("/signup",signup_controller.signup);
routes.post("/signupApi",signup_controller.signupApi);
routes.post("/login",login_controller.login_by_email)




module.exports=routes;