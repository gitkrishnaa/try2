const jwt=require("jsonwebtoken");

module.exports.authenticate_Premium_user=(req,res,next)=>{
    console.log(req.body,"req.body in middlewer authentication/from-auth/authUser.js authenticate_user......................")
    
   
   
    try {

        const token=req.header("Authorization")
        console.log("FROM premum_User_Auth>JWT token header--",token)
        const tokendata=jwt.verify(token,"sekeretkeyxyz")  
      console.log("tokendata-> email -",tokendata)
req.user=tokendata;
if(tokendata.isPremium){

    next(); 
}
else{
    res.status(200).json({messge:"user is not not premium user so requst denied; /from-auth/premiumUserAuth or backend err"})
    console.log("error premiumUserAuth.js in auth")
}
  
       

    } catch (error) {
        res.status(200).json({messge:"user token not aviliable/user logged out so login /from-auth/premiumUserAuth or backend err"})
       console.log("error premiumUserAuth.js in auth")
    }
}