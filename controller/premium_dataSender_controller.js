const login_user = require("../db_model/login_user");
const expense_record = require("../db_model/expense_record");
const transaction_model = require("../db_model/transaction_model");


module.exports.All_User_Expenses = (req, res) => {
    //req.user assign in authenticate
  
    console.log(req.body, "user data >>>>>>>>");
    login_user
      .findAll({
        attributes: [ "name", "email", "premium_user","totalExpenses"],
 

      })
      .then((a) => {
        res.status(200).send({data:a,message:"data send from premium data sender controller"});
      })
      .catch((err) => {
        res.send({ err:err,errorHint:"from-/contrller/datasender User_all_Data" });
      });
  
  };
  