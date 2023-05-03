const login_db_model=require("../db_model/login_user.js");
const jwt=require("jsonwebtoken");

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

static find_By_Login_Email(email_Id){
    //it will return promise
   return  login_db_model.findAll({where:{email:email_Id}})

}
static jwtTokenGenrate(email_Id,user_name,user_id){
    // return jwt.sign(email_Id,"sekeretkeyxyz")
    return jwt.sign({email_Id,user_name,user_id},"sekeretkeyxyz")

}

 }

// function find_By_Login_Email() {
   
// }
// find_By_Login_Email()

