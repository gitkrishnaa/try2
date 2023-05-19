const user_db = require("../db_model/login_user");
const forget_password_db = require("../db_model/forget_password_record");
const { v4 } = require("uuid");

module.exports.fetchEmail = async (req, res) => {
  console.log(req.body.email);

  const user_email = req.body.email;
  user_db.findOne({ where: { email: user_email } }).then((a) => {
    if (a != null) {
      const uniq_string_generate = v4(); //this is function so use variable() which return unique string
      function emailSender(sender_email, reciverEmail, messageObj) {
        var nodemailer = require("nodemailer");
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "krishna.123project@gmail.com",
            pass: "hqisbqsstzhqmibr",
          },
        });
        //messageObj is custom object which have message related info

        var mailOptions = {
          from: sender_email,
          to: reciverEmail,
          subject: "password reset",
          text: messageObj.text,
          html: `<a href="http://127.0.0.1:5500/view/forgot_reset_password/reset_password.html?id=${uniq_string_generate}" target="_blank"><button>Reset Link</button></a>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            console.log([
              "email not sent , maybe email adress worng or code proble,from-/contoller/forget_password  transporter.sendMail",
            ]);
            return { status: false, data: error };
          } else {
            //email sent sucessfully then this code will run

            //strong in database
            //database_name:forget_password_recordd model
            //uniq_string_generate()->it will generate unique string

            const email_Send_id_by_api = info.response;
            const isActive = true;
            const userEmail = user_email;

            forget_password_db.create({
              system_request_id: uniq_string_generate,
              email_send_id_by_server: email_Send_id_by_api,
              isActive: isActive,
              user_email: userEmail,
            });

            //sending reset link to registred eamil id

            res.status(200).send({
              message: `Reset link sent to registred email ${user_email} `,
              user: true,
              data: info,
            });

            console.log("Email sent: " + info.response);
            console.log([
              "email sent sucessful ,from-/contoller/forget_password  transporter.sendMail",
            ]);

            return { status: true, data: info };
          }
        });
      }
      // "email sending link "
      const message_obj = {
        html: "<h1>hello kk message forgot passwaord</h1>",
        text: "hello",
      };
      const resposne = emailSender(
        "krishna.123project@gmail.com",
        user_email,
        message_obj
      );
    } else {
      // console.log("unique string ",uniq_string_generate)
      console.log([
        "user not exist in database from-/contoller/forget_password ",
      ]);
      res
        .status(200)
        .send({ message: `${user_email} is not registred `, user: false });
    }
  });
  // .catch(res.send({message:` ${user_email} is not exist`}))
};

module.exports.resetPassword=async(req,res)=>{
  
const reset_request_id=req.body.reset_request_id;
const updataed_password=req.body.password
console.log("hello",reset_request_id,updataed_password,"from-/contoller/forget_password resetPassword()")
forget_password_db.findOne({where:{system_request_id:reset_request_id}})
.then((resp)=>{

  if(resp!=null){
//password updating
   if(resp.isActive==true){
    resp.update({isActive:false})
    user_db.findOne({where:{email:resp.user_email}})//find user using email id
    .then((resp_update)=>{
      resp_update.update({password:updataed_password}) //update password
      res.send({message:"passwoerd has been chaned",status:true,data:resp_update})
      console.log(resp,["reset request id match sucessful,paasword update to the user email" ,resp.user_email])
    })

   }
else{
  res.send({message:"password reset link is expired",status:false})
    console.log(resp,["reset request id match sucessful","but link is expired"])
}



  } 
  else{
    res.send({data:resp,status:false,message:"request id did not match"})
console.log(resp,"[reset request id not match]")
  }
})
.catch((err)=>{
res.send(err)
console.log(err,["reset request id not match"])
})




}
