const express=require("express");
const app=express();
const routes=express.Router();
const signup_controller=require("../controller/signup.js")
const login_controller=require("../controller/loginController.js")
const expense_data_controller=require("../controller/expense_control.js");
const dataSender_controller=require("../controller/dataSender_controller.js");
const forget_password_controller=require("../controller/forget_password.js");

const authenthicate=require("../auth/userAuth.js")



routes.post("/signup",signup_controller.signup);
routes.post("/signupApi",signup_controller.signupApi);
routes.post("/login",login_controller.login_by_email);
routes.post("/expenseData",authenthicate.authenticate_user,expense_data_controller.insert_Data);
//to delete expenses by id in database
routes.post("/expenseData/:id",authenthicate.authenticate_user,expense_data_controller.delete_by_id);
//to edit expenses 
routes.post("/editExpenseData/:id",authenthicate.authenticate_user,expense_data_controller.edit_expense_data);
//fetch all expense data
routes.post("/getExpenseData",authenthicate.authenticate_user,expense_data_controller.fetchbyUser_specific_email);


//pagination
routes.get("/ExpenseData_paginated",authenthicate.authenticate_user,expense_data_controller.fetchbyUser_specific_email_pagination);





//forgot pasword section


routes.post("/forget_password",forget_password_controller.fetchEmail);
routes.post("/reset_password",forget_password_controller.resetPassword);



module.exports=routes;