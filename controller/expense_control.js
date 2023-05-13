const expense_model = require("../model/expense.js");

module.exports.insert_Data = (req, res) => {
  // const {expense_amount,discription,catogary,user_email_id}=req.body
  const { expense_amount, discription, catogary, user_email_id } = req.body;
  console.log(req.user, "insert_Data from controller expense inserData()");
  //note req.user have email of logged or token releted data
  const email_id_from_token = req.user.email_Id;
  const name_from_token = req.user.user_name;
  const id_from_token = req.user.user_id;

  expense_model
    .insert(expense_amount, discription, catogary, email_id_from_token,id_from_token)
    .then((a) => {
      console.log({
        insert_data: "data iserted sucessfully",
        user: req.user,
        x: [4, 5],
      });
      res.send(a);
    })
    .catch((err) => {
      console.log({ inser_data: "data inserting fail " }, err);
      res.send(err);
    });
  console.log(req.body, "insert_Data from controller expense inserData()");
  console.log(expense_amount, discription, catogary, user_email_id);
};
//fetch all user data
module.exports.send_all_expenses = (req, res) => {
  expense_model
    .fetch_all_expense()
    .then((a) => {
      res.json(a);
    })
    .catch((err) => {
      console.log(err);
    });
};
//fetch and send user specific data using jwttiken data from auth, data share from global object req.user,this
//only work with same route for req.user, it is a custom object avikiable on global object of the route
module.exports.fetchbyUser_specific_email = (req, res) => {
  console.log(
    req.body,
    req.user,
    "/from -fetchbyUser_specific_email, controller/exprese_cntroller"
  );
  const email_id_from_token = req.user.email_Id;
  const name_from_token = req.user.user_name;
  const id_from_token = req.user.user_id;
  // console.log(email_id_from_token,req.user)
  expense_model
    .fetch_One_user_expense(email_id_from_token)
    .then((a) => {
      res.json({
        resp: a,
        userDetails: {
          name: name_from_token,
          email: email_id_from_token,
          id: id_from_token,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.delete_by_id = (req, res) => {
  const id = req.params.id;

  console.log(
    "expense data deltete_by_id opreation :from controller deletebyid"
  );
  // res.send("delete id="+req.params.id)
  expense_model
    .delete_by_id(id)
    .then((a) => {
      console.log("data deleted of id", id);
      res.status(200).json(a);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(
        "somtong err in expense data delete by id",
        "status code 400"
      );
      console.log(err);
    });
};
module.exports.edit_expense_data = (req, res) => {
  console.log(req.body);
  const { expense_amount, discription, catogary, id } = req.body;
  expense_model
    .edit_expense_data(req.params.id)
    .then((a) => {
      a.expenses = expense_amount;
      a.description = discription;
      a.catogary = catogary;

      return a.save();
    })
    .then((a) => {
      console.log("edit data opration :from controller expensecontrol");
      res.status(200).send(a);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
};
