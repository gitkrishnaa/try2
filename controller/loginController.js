const UserModel=require("../model/login_user")

module.exports.login_by_email=(req,res)=>{
console.log(req.body)
UserModel.find_By_Login_Email(req.body.email)
.then(a=>{console.log("user exist in db login from logincontroller")

res.send(a)
})
.catch(err=>{console.log(err,"email not exist in logib, from logincontrolle")})



}