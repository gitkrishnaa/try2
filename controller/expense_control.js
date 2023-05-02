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

module.exports.delete_by_id=(req,res)=>{
    const id=req.params.id
   
    console.log("expense data deltete_by_id opreation :from controller deletebyid")
    // res.send("delete id="+req.params.id)
    expense_model.delete_by_id(id)
    .then((a)=>{
        
        console.log("data deleted of id",id)
res.status(200).json(a);
    })
    .catch(err=>{
        res.status(400).json(err);
        console.log("somtong err in expense data delete by id","status code 400")
        console.log(err)})
   

}
module.exports.edit_expense_data=(req,res)=>{
    console.log(req.body)
    const {expense_amount,discription,catogary,id}=req.body
expense_model.edit_expense_data(req.params.id)
.then(a=>{
    a.expenses=expense_amount;
    a.description=discription;
    a.catogary=catogary;

    return a.save()
})
.then(a=>{
    console.log("edit data opration :from controller expensecontrol")
 res.status(200).json(a);
})
.catch(err=>{console.log(err)
    res.status(404).json(err);
})
}
