const user_db=require("../db_model/login_user")

module.exports.fetchEmail=async(req,res)=>{

console.log(req.body.email)

const user_email=req.body.email;
user_db.findOne({ where: { email: user_email } })
.then(a=>{
    
  if(a!=null) {
    res.status(200).send({message:`Reset link sent to regiserd email ${user_email} `,user:true})

  }
  else{
    res.status(200).send({message:`${user_email} is not registred `,user:false})

  }}
)   
// .catch(res.send({message:` ${user_email} is not exist`}))


}