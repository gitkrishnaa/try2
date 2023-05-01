const login_db_model=require("../db_model/login_user.js");

 module.exports=class Product{
    constructor(id,name,email,mobile,password){
        this.id=id;
    this.name=name;
    this.email=email;
    this.mobile=mobile;
    this.password=password;
}
static insert(name,email,mobile,password) {
    return login_db_model.create({
        name:name,
        password:password,
        email:email,
        mobile:mobile,

        })
      
}



 }




