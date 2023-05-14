const express=require("express");
const app=express();
const routes=express.Router();
const user_data_sender_controller=require("../controller/dataSender_controller")

const authenthicate=require("../auth/userAuth.js")





routes.post("/p/user/allDetails",authenthicate.authenticate_user,user_data_sender_controller.User_all_Data);

routes.post("/p/user",authenthicate.authenticate_user,user_data_sender_controller.User_details);
routes.post("/p/user/expenses",authenthicate.authenticate_user,user_data_sender_controller.User_expenses);
routes.post("/p/user/transaction",authenthicate.authenticate_user,user_data_sender_controller.User_transaction);











module.exports=routes;