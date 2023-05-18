const fgp_btn=document.getElementById("fgp_btn1")
const input_value=document.getElementById("input1")

fgp_btn.addEventListener("click",async()=>{
if(input_value.value==""){
    alert("please enter your email")
    return;
}


// working on backend


const response=await axios.post("http://localhost:4200/user/forget_password",{
    email:input_value.value
})
console.log(response)
})