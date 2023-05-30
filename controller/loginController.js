const UserModel=require("../model/login_user")
const login_db_model=require("../db_model/login_user.js");
const bcrypt=require("bcrypt")
module.exports.login_by_email=(req,res)=>{


const {email,password}=req.body


console.log(email,password,"body data",["data"])
if(req.body.email==""){
   return res.json({serverMessage:"email and password not recievd,may be empty input value"})
}
login_db_model.findAll({where:{email:req.body.email}})
.then(async(a)=>{

//if email not exist
if(a.length==0){
    console.log({response:{message:"email not exist",status:false}})
    res.json({response:{message:"email not exist",status:false}}) 
return;
}


  try {
    const user_name=a[0].dataValues.name;
    const user_id=a[0].dataValues.id;
    const isPremium=a[0].dataValues.premium_user;
    const encrypted_password=a[0].dataValues.password;
const is_match=await bcrypt.compare(password,encrypted_password)
    // console.log(user_name,user_id,"user exist in db login m:from logincontroller................")
    // console.log([is_match],a)
const data={
    name:user_id,
    id:user_id,
    isPremium:isPremium,
    
}
if(is_match){
    //SENDING JWT TOKEN
  const token=  UserModel.jwtTokenGenrate(req.body.email,user_name,user_id,isPremium)
    res.json({token:token,data,response:{message:"login sucessful",status:true}})
}
else{
    console.log(email,password,{response:{message:"password not match",status:false}})
    res.json({response:{message:"password not match",status:false}})
   
}

 } catch (error) {
    console.log(email,password,{response:{message:"backend erro",status:false}},error)
    res.json({response:{message:"password not match",status:false}})
// throw new Error("error in ligincontroller")
   }
      
})
.catch(err=>{
    res.json({user:false})
    console.log(err,"email not exist in logib, from logincontrolle")})



}