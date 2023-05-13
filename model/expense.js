const { where } = require("sequelize");
const login_db_model=require("../db_model/expense_record.js");

 module.exports=class Product{
    constructor(id,name,email,mobile,password){
        this.id=id;
    this.name=name;
    this.email=email;
    this.mobile=mobile;
    this.password=password;
}
static insert(expenses,description,catogary,user_email_id,user_id) {
    return login_db_model.create({
        expenses:expenses,
        description:description,
        catogary:catogary,
        user_email_id:user_email_id,
        loginUserId:user_id
         
        })
      
}
static fetch_all_expense(){
    console.log("fetch expense all data in db :from model/expenses")
    return login_db_model.findAll();
}
static fetch_One_user_expense(email_id){
    console.log("fetch expense all data in db :from model/expenses")
    return login_db_model.findAll({where:{user_email_id:email_id}});
}
static delete_by_id(expense_id){
    return login_db_model.destroy({where:{id:expense_id}});
}
static edit_expense_data(expense_id){

    return login_db_model.findByPk(expense_id)
    


}
 }