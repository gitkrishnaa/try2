const expense_model = require("../model/expense.js");
const login_users = require("../db_model/login_user.js");
const expenses_model = require("../db_model/expense_record.js");

module.exports.insert_Data = (req, res) => {
  // const {expense_amount,discription,catogary,user_email_id}=req.body
  const { expense_amount, discription, catogary, user_email_id } = req.body;
  console.log(req.user, "insert_Data from controller expense inserData()");
  //note req.user have email of logged or token releted data
  const email_id_from_token = req.user.email_Id;
  const name_from_token = req.user.user_name;
  const id_from_token = req.user.user_id;

  expense_model
    .insert(
      expense_amount,
      discription,
      catogary,
      email_id_from_token,
      id_from_token
    )
    .then(async (a) => {
      console.log({
        insert_data: "data iserted sucessfully",
        user: req.user,
      });
      try {
        //inserting user total expenes in ligin user table
        // const totalExpense_current=await login_users.findByPk(id_from_token,)
        const totalExpense_current = await login_users.findByPk(id_from_token);
        const totalExpense_current_value =
          totalExpense_current.dataValues.totalExpenses;
        // console.log("total expenses:",totalExpense_current.dataValues.totalExpenses)
        totalExpense_current.totalExpenses =
          +expense_amount + +totalExpense_current_value;
        await totalExpense_current.save();
        // console.log("................ updating totalexpense in user table.............")

        console.log("after update :", totalExpense_current);

        // console.log("..............end...........................")
      } catch (error) {
        // console.log("................ updating totalexpense in user table has error.............")
        console.log(error);
        // console.log("..............end...........................")
      }

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

module.exports.delete_by_id = async (req, res) => {
  const id = req.params.id;

  console.log(
    "expense data deltete_by_id opreation :from controller deletebyid",
    req.body
  );
  try {
    const user_id = req.user.user_id;
    //inserting user total expenes in ligin user table
    // const totalExpense_current=await login_users.findByPk(id_from_token,)
    const totalExpense_current = await login_users.findByPk(user_id);
    const expense_amount = await expenses_model.findByPk(id); //expenseAmount_in_expense_table
    console.log(expense_amount);
    const expense_amount_value = Number(expense_amount.dataValues.expenses); //we get value

    const totalExpense_current_value = Number(
      totalExpense_current.dataValues.totalExpenses
    );
    console.log(
      "before total expenses:",
      totalExpense_current,
      totalExpense_current_value,
      "id",
      id
    );
    if (totalExpense_current_value <= expense_amount_value) {
      totalExpense_current.totalExpenses = "0";
      const response=await totalExpense_current.save();
      console.log("response of totalexpense-delete anount", response);
    } else {
      totalExpense_current.totalExpenses =
        totalExpense_current_value - expense_amount_value;
      const response = await totalExpense_current.save();
      console.log("response of totalexpense-delete anount", response);
    }
    // totalExpense_current.totalExpenses =expense_amount
    // await totalExpense_current.save();
    console.log(
      "................ updating totalexpense in user table............."
    );

    console.log("after update :", totalExpense_current);

    console.log("..............end...........................");

    expense_model
      .delete_by_id(id)
      .then(async (a) => {
        console.log("data deleted of id", id, a);
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
  } catch (error) {
    console.log(
      "................ updating totalexpense in user table has error............."
    );
    console.log(error);
    // console.log("..............end...........................")
  }

  //delete data in expense table
};
module.exports.edit_expense_data =async (req, res) => {
  // console.log(req.body)
  const { expense_amount, discription, catogary, id } = req.body;
  const user_id=req.user.user_id;
    const expense_id=req.params.id;
  try {
    // const user_id=req.user.user_id;
    // const expense_id=req.params.id;
    //inserting user total expenes in ligin user table
    // const totalExpense_current=await login_users.findByPk(id_from_token,)
    const edit_expense_amount=Number(expense_amount);
    const totalExpense_current = await login_users.findByPk(user_id);
    const expense_amount_current=await expenses_model.findByPk(expense_id) //expenseAmount_in_expense_table
    console.log(expense_amount_current)
   const  expense_amount_value=Number(expense_amount_current.dataValues.expenses) //we get value

    const totalExpense_current_value =Number(totalExpense_current.dataValues.totalExpenses)
    console.log("before total expenses:",totalExpense_current,totalExpense_current_value,"id",id)
if(totalExpense_current_value<= edit_expense_amount){
  totalExpense_current.totalExpenses =edit_expense_amount
  const response=await totalExpense_current.save();
  console.log("response of totalexpense-delete amount",response)
}
else{
  //logic- final total expense in user tabel=previous totalexpense-current expense amount + edit expense amount value
  totalExpense_current.totalExpenses =totalExpense_current_value - expense_amount_value + edit_expense_amount
  const response=await totalExpense_current.save();
  console.log("response of totalexpense-delete amount",response)
}
    // totalExpense_current.totalExpenses =expense_amount 
    // await totalExpense_current.save();
    console.log("................ updating totalexpense in user table.............")

    console.log("after update :", totalExpense_current);

    console.log("..............end...........................")


    // expense data editing part 
    console.log(req.body);
  
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
  } catch (error) {
    console.log("................ updating totalexpense in user table has error.............")
    console.log(error);
    // console.log("..............end...........................")
  }
  
};
module.exports.fetchbyUser_specific_email_pagination=async(req,res)=>{
  const limit=Number(req.query.limit);
  const offset=Number(req.query.page)-1; //page 
  const skip=limit*offset  //skip
  const user_email_id=req.user.email_Id
  console.log("limit:",limit,"page/offset:",offset,"skip:",skip,user_email_id);
try {


 const data=await expenses_model.findAll({
  where:{user_email_id:user_email_id},
  offset: skip, limit: limit });

if(data.length<=0){
  res.send({message:"users data is empty or no more data aviliable after this page",status:false,data:data})
}else{

  res.send({message:"data is send",data:data,status:true})
}
} catch (error) {
  res.send({message:"error",data:error,status:false})
}
}