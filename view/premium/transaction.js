////////////////////////////////////////////////////////////////
import * as variables from "../variable.js"
const webHost=variables.apiHost
console.log(webHost,"variale.js")

////////////////////////////////////////////////////////////////
document.getElementById('rzp-button1').onclick = async function(e){
  
    e.preventDefault();

    const response=await axios.get(webHost+"/buyPremium")
    
    
    var options = {
        "key": "rzp_test_SAriwGpZezC6TL", // Enter the Key ID generated from the Dashboard
        "amount": response.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "handler":async function(resp){
            const send= axios.post(webHost+"/buyPremium",{
                Headers: { authorization_token: localStorage.getItem("jwtkey") },//jwt token
                amount:500,
                order_id:options.order_id,
                response:resp,
                payment:true,
            },{headers:{"Authorization":localStorage.getItem("jwtkey")}})
            .then(()=>{
                alert("you are premiusm user now")
            })
            .catch((err)=>{
                alert("data inserting or other problem")
                console.log(err)
            })
           
        }
      
    };
    
    var rzp1 = new Razorpay(options);
    rzp1.open()
    rzp1.on('payment.failed',async function(resp){
        const send=axios.post(webHost+"/buyPremium",{
            Headers: { authorization_token: localStorage.getItem("jwtkey") },//jwt token
            amount:500,
            order_id:options.order_id,
            response:resp,
            payment:false
        },{headers:{"Authorization":"token"}});

        alert("payment failed")
    })
    // rzp1.then((a)=>{
    //     console.log(a)
  
}