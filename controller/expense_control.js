const expense_model=require("../model/expense.js")

module.exports.insert_Data=(req,res)=>{
const {expense_amount,discription,catogary,user_email_id}=req.body
expense_model.insert(expense_amount,discription,catogary,user_email_id)
.then(a=>{
    console.log(a);
    res.send(a)
})
.catch(err=>{console.log(err)
res.send(err)
})
console.log(req.body)
console.log(expense_amount,discription,catogary,user_email_id)
}

module.exports.send_all_expenses=(req,res)=>{
    expense_model.fetch_all_expense()
    .then(a=>{
        res.json(a)
    })
    .catch(err=>{console.log(err)})
}