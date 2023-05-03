const UserModel=require("../model/login_user")

module.exports.login_by_email=(req,res)=>{





console.log(req.body)
if(req.body.email==""){
   return res.json({serverMessage:"email and password not recievd,may be empty input value"})
}
UserModel.find_By_Login_Email(req.body.email)
.then(a=>{
    // if()
        const user_name=a[0].dataValues.name;
        const user_id=a[0].dataValues.id;
        console.log(user_name,user_id,"user exist in db login m:from logincontroller................")
     //SENDING JWT TOKEN   
      const token=  UserModel.jwtTokenGenrate(req.body.email,user_name,user_id)
res.json({token:token,a})
})
.catch(err=>{
    res.json({user:false})
    console.log(err,"email not exist in logib, from logincontrolle")})



}