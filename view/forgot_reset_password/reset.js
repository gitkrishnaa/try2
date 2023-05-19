const fgp_btn=document.getElementById("fgp_btn1")
const input_value=document.getElementById("input1")

fgp_btn.addEventListener("click",async()=>{
if(input_value.value==""){
    alert("please enter your email")
    return;
}


// working on backend
const query_params = new URLSearchParams(window.location.search);
const reset_request_id=query_params.get("id")
console.log(reset_request_id)
const response=await axios.post("http://localhost:4200/user/reset_password",{
    password:input_value.value,
    reset_request_id:reset_request_id,

})
const message_div=document.getElementById("message");
const message=response.data.message
if(response.data.status){
    
    message_div.innerText=message;
    message_div.style.color="green";
}
else{
    message_div.innerText=message
    message_div.style.color="red";

}
console.log(response)
})