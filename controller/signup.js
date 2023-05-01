const UserModel=require("../model/login_user")

module.exports.signup=(req,res)=>{
console.log(req.body)


const id=req.body.id;
const name=req.body.name;
const mobile=req.body.mobile;
const email=req.body.email;
const password=req.body.password;
//object constructor(id,name,email,mobile,password)
const user=new UserModel(id,name,email,mobile,password)
console.log(user)
// insert param format insert(name,email,mobile,password)
    UserModel.insert(user.name,user.email,user.mobile,user.password)
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



