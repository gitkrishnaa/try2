const login_user = require("../db_model/login_user");
const expense_record = require("../db_model/expense_record");
const transaction_model = require("../db_model/transaction_model");
const download_data = require("../db_model/download_data");

const AWS=require("aws-sdk");
const { time, error } = require("console");

module.exports.All_User_Expenses = (req, res) => {
    //req.user assign in authenticate
  
    console.log(req.body, "user data >>>>>>>>");
    login_user
      .findAll({
        attributes: [ "name", "email", "premium_user","totalExpenses"],
      })
      .then((a) => {
        res.status(200).send({data:a,message:"data send from premium data sender controller"});
      })
      .catch((err) => {
        res.send({ err:err,errorHint:"from-/contrller/datasender User_all_Data" });
      });
  
  };
module.exports.downlink_data_fun=async(req,res)=>{
const user_email=req.user.email_Id
const user_id=req.user.user_id
console.log(req.user,user_email)
const time=new Date()
console.log(time)


////////////////////////////////////////////
  //checking data aviliable in .env
  require('dotenv').config();
  const fs=require("fs")
  const AWS_SECRET_KEY=process.env.AWS_SECRET_KEY
  const AWS_SECRET_PASSWORD=process.env.AWS_SECRET_PASSWORD
  //throw error if RAZORPAY_KEY or RAZORPAY_PS is not exist in .env file
const check_env_variable=require("../custom/taskFunction").is_env_data_aviliable
check_env_variable(AWS_SECRET_KEY,AWS_SECRET_PASSWORD)
/////////////////////////////////////////////////////////


const data=await expense_record.findAll({where:{loginUserId:user_id}})
try {
  // console.log(data)
  const data_string=JSON.stringify(data)
  //uplaod data
 const resp_aws=await uplaod(`user${user_id}/index_time-${time}.json`,data_string)
 console.log("uplad resp",resp_aws,resp_aws.Location)


//store download link in database
const save_download_link=await download_data.create({
  link:resp_aws.Location,
  loginUserId:user_id,
  user_email:user_email
})
//sending response to frontend
res.json({message:"sucessful done",status:true,data:resp_aws})
} catch (error) {
  res.json({message:"faild",status:false,data:error})
  console.log("error from uploading file to aws",error)
}






  function uplaod(file_name,file_data){
  let s3_bucket=new AWS.S3({
      accessKeyId:AWS_SECRET_KEY,
      secretAccessKey:AWS_SECRET_PASSWORD
  })
 
      const params={
  Bucket:"expense-user-data",
  Key:file_name,
  Body:file_data,
  ACL:"public-read"
      }
      return new Promise((resolve,reject)=>{
        s3_bucket.upload(params,(err,S3_resp)=>{
          if(err){
              // console.log("error",err)
         
          reject(err)
          }
          // else{console.log("sucess",resp)}
          
          resolve(S3_resp)
              })
      })
     
  }
  
  }
  
