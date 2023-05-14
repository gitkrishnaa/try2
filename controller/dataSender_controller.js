const login_user = require("../db_model/login_user");
const expense_record = require("../db_model/expense_record");
const transaction_model = require("../db_model/transaction_model");

module.exports.User_all_Data = (req, res) => {
  //req.user assign in authenticate

  console.log(req.body, "user data >>>>>>>>");
  login_user
    .findAll({
      where: { id: req.user.user_id },
      include: [expense_record, transaction_model],
     
    })
    .then((a) => {
      res.status(200).send(a);
    })
    .catch((err) => {
      res.send({ err:err,errorHint:"from-/contrller/datasender User_all_Data" });
    });

};

module.exports.User_details = (req, res) => {
  //req.user assign in authenticate

  console.log(req.body, "user data >>>>>>>>");
  login_user
    .findAll({
      where: { id: req.user.user_id },
    //   attributes: ["id", "mobile", "name", "email", "premium_user"],
    })
    .then((a) => {
      res.status(200).send(a);
    })
    .catch((err) => {
        res.send({ err:err,errorHint:"from-/contrller/datasender User_details" });

    });
 
};

module.exports.User_expenses = (req, res) => {
    //req.user assign in authenticate
  
    console.log(req.body, "user data >>>>>>>>");
    login_user
      .findAll({
        where: { id: req.user.user_id },
        include: [expense_record],
        attributes: ["id", "mobile", "name", "email", "premium_user"],
      })
      .then((a) => {
        res.status(200).send(a);
      })
      .catch((err) => {
        res.send({ err:err,errorHint:"from-/contrller/datasender User_expenses" });

      });
    
  };
  
  module.exports.User_transaction = (req, res) => {
    //req.user assign in authenticate
  
    console.log(req.body, "user data >>>>>>>>");
    login_user
      .findAll({
        where: { id: req.user.user_id },
        include: [transaction_model],
        attributes: ["id", "mobile", "name", "email", "premium_user"],
      })
      .then((a) => {
        res.status(200).send(a);
      })
      .catch((err) => {
        res.send({ err:err,errorHint:"from-/contrller/datasender User_transaction" });

      });
    
  };
  