const user_db = require("../db_model/login_user");

module.exports.fetchEmail = async (req, res) => {
  console.log(req.body.email);

  const user_email = req.body.email;
  user_db.findOne({ where: { email: user_email } }).then((a) => {
    if (a != null) {
      res.status(200).send({
        message: `Reset link sent to registred email ${user_email} `,
        user: true,
      });





      function emailSender(sender_email, reciverEmail, messageObj) {
        var nodemailer = require("nodemailer");
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "krishna821084@gmail.com",
            pass: "bxretrwgawdnhzsk",
          },
        });
        //messageObj is custom object which have message related info

        var mailOptions = {
          from: sender_email,
          to: reciverEmail,
          subject: "revgfeapfedvoe",
          text: messageObj.text,
          html: messageObj.html,
        };

        return transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return { status: false, data: error };
          } else {
            console.log("Email sent: " + info);
            return { status: true, data: info };
          }
        });
      }
      const message_obj = {
        html: "<h1>hello kk message forgot passwaord</h1>",
        text: "hello",
      };
      const resposne = emailSender("krishna821084@gmail.com","bjgold.in@gmail.com",message_obj);


const promiseX=new Promise((res,rej)=>{
if(resposne.status){
    res(resposne.data)
}
else{
    rej(resposne.data)
}
    })

    promiseX.then(a=>{console.log(a,"suceed")})
    .catch((err)=>{
console.log(err)
    })




    } 
    
    
    
    
    
    
    
    
    
    
    
    else {
      res
        .status(200)
        .send({ message: `${user_email} is not registred `, user: false });
    }
  });
  // .catch(res.send({message:` ${user_email} is not exist`}))
};
