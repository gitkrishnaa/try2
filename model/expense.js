const login_db_model=require("../db_model/expense_record.js");

 module.exports=class Product{
    constructor(id,name,email,mobile,password){
        this.id=id;
    this.name=name;
    this.email=email;
    this.mobile=mobile;
    this.password=password;
}
static insert(expenses,description,catogary,user_email_id) {
    return login_db_model.create({
        expenses:expenses,
        description:description,
        catogary:catogary,
        user_email_id:user_email_id,

        })
      
}
static fetch_all_expense(){
    console.log("fetch expense all data in db :from model/expenses")
    return login_db_model.findAll();
}
 }