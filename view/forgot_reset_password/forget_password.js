////////////////////////////////////////////////////////////////
import * as variables from "../variable.js"
const webHost=variables.apiHost
console.log(webHost,"variale.js")

////////////////////////////////////////////////////////////////
const fgp_btn=document.getElementById("fgp_btn1")
const input_value=document.getElementById("input1")

fgp_btn.addEventListener("click",async()=>{
if(input_value.value==""){
    alert("please enter your email")
    return;
}


// working on backend


const response=await axios.post(webHost+"/user/forget_password",{
    email:input_value.value
})
const message_div=document.getElementById("message");
const message=response.data.message
if(response.data.user){
    
    message_div.innerText=message;
    message_div.style.color="green";
}
else{
    message_div.innerText=message
    message_div.style.color="red";

}
console.log(response)
})