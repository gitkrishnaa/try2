const UserModel=require("../model/login_user")
const login_db_model=require("../db_model/login_user.js");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
module.exports.signup=async (req,res)=>{
console.log(req.body)
const id=req.body.id;
const name=req.body.name;
const mobile=req.body.mobile;
const email=req.body.email;
const password=req.body.password;


//encrypt password
const salt=bcrypt.genSaltSync(10);
const encrypted_password=await bcrypt.hash(password,salt)
console.log("encrypted password is=",encrypted_password)



// insert param format insert(name,email,mobile,password)
login_db_model.create({
    name:name,
    password:encrypted_password,
    email:email,
    mobile:mobile,
    premium_user:false})
    .then(a=>{console.log("#status-sucessful")
    res.status(200).send(a)

})
    .catch(err=>{
       
        console.log(err,"#status-fail")
        res.status(400).send(err)
        
    })

 }
 
 //using api to send post data,axios
module.exports.signupApi=(req,res)=>{
console.log(req.body)
    console.log("ok")
    res.send("signup using api")
}



