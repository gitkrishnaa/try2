const express=require("express");
const app=express();
const routes=express.Router();
const user_data_sender_controller=require("../controller/dataSender_controller")
const premium_dataSender_controller=require("../controller/premium_dataSender_controller");
// const download_data_controller=require("../controller/download_link_controller")


const authenthicate=require("../auth/userAuth.js")
const premiumUserAuth=require("../auth/premiumUserAuth")





routes.post("/p/user/allDetails",authenthicate.authenticate_user,user_data_sender_controller.User_all_Data);

routes.post("/p/user",authenthicate.authenticate_user,user_data_sender_controller.User_details);
routes.post("/p/user/expenses",authenthicate.authenticate_user,user_data_sender_controller.User_expenses);
routes.post("/p/user/transaction",authenthicate.authenticate_user,user_data_sender_controller.User_transaction);


//premium data sender feature

// routes.post("/p/Alluser",premiumUserAuth.authenticate_Premium_user,premium_dataSender_controller.All_User_Expenses);
routes.post("/p/Alluser",authenthicate.authenticate_user,premium_dataSender_controller.All_User_Expenses);

routes.post("/p/download_data",authenthicate.authenticate_user,premium_dataSender_controller.downlink_data_fun);

//download data
// routes.post("/p/download_data",download_data_controller.downlink_data_fun);







module.exports=routes;