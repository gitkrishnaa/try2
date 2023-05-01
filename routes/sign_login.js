const express=require("express");
const app=express();
const routes=express.Router();
const signup_controller=require("../controller/signup.js")
const login_controller=require("../controller/loginController.js")
const expense_data_controller=require("../controller/expense_control.js")


routes.post("/signup",signup_controller.signup);
routes.post("/signupApi",signup_controller.signupApi);
routes.post("/login",login_controller.login_by_email);
routes.post("/expenseData",expense_data_controller.insert_Data);
routes.get("/getExpenseData",expense_data_controller.send_all_expenses);




module.exports=routes;