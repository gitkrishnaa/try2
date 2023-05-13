const db_transaction=require("../db_model/transaction_model");

const Razorpay=require('razorpay');
const { options } = require("../routes/sign_login");

module.exports.create_transaction=async (req,res)=>{
console.log("transtion pending .............")

const newOrderPayment=new Razorpay({ key_id: 'rzp_test_zdhvBSMTOztAgY', key_secret: '1lUpWcGSb7mMRWx2mDJybyr3' });

const options = {
    amount: 50000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  newOrderPayment.orders.create(options, function(err, order) {
    console.log(order,err)
    res.send(order)
});

}

module.exports.transaction_response=async (req,res)=>{




    //req.user this is set data in authenanticate data of token
    
    console.log("from controller/tranctioncntrl transaction_response>>>>>>>>>>>>>>>>>")
    console.log("tokendata ",req.user)
console.log("payment response ->",req.body,)
const status=req.body.payment;

if(status){
    const order_id=req.body.response.razorpay_order_id
    const amount_to_buy_premium=req.body.amount

const payment_id=req.body.response.razorpay_payment_id
const razorpay_signature=req.body.response.razorpay_signature
    db_transaction.create({
        amount:amount_to_buy_premium,
        order_id:order_id,
        payment_id:payment_id,
        razorpay_signature:razorpay_signature,
        status:status,
        loginUserId:req.user.user_id,
        user_email:req.user.email_Id
    })
    .then(()=>{
   //since payment sucessful so user become premium user so now updating in mysql
   const db_user=require("../db_model/login_user");
   const user_id=req.user.user_id
   db_user.findByPk(user_id)
.then((data)=>{
    data.premium_user=true;
   return data.save()
})
.then((a)=>{
    console.log("#user premium_user in user table true updated")
    res.send("sucessful")
})
.catch((err)=>{
    res.send("user table not updated")
console.log("premium_user in usertable not updated and error is ",err)
})
        
        console.log("transaction is sucessful and added in backend ")
    })
}
else{
    const order_id=req.body.order_id
    const amount_to_buy_premium=req.body.amount
        db_transaction.create({
            amount:amount_to_buy_premium,
            order_id:order_id,
            payment_id:"transaction faild",
            razorpay_signature:"transaction fail",
            status:false,
            loginUserId:req.user.user_id,
            user_email:req.user.email_Id
        }) 
        .then(()=>{
            console.log("transaction is failed and added in baend ")
        }) 

}
}