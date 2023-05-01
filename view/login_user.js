// const x=axios.post('http://localhost:4200/user/signupApi', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   })
// //   .then(function (response) {
// //     console.log(response);
// //   })
// //   .catch(function (error) {
// //     console.log(error);
// //   });
// x.then(a=>{console.log(a,"yghg")})
// const user_name=document.getElementById("user_name")
// const user_email=document.getElementById("user_email")
const user_mobile=document.getElementById("user_mobile")
const user_password=document.getElementById("user_password")
const login_btn=document.getElementById("login_btn")



login_btn.addEventListener("click",()=>{
console.log("login button is clicked")
  async function abc(){
    //this function return respusnse as promise which acess using .then(), .catch()
    return await axios.post('http://localhost:4200/user/login', {
      
       email:user_email.value,
      
       password:user_password.value
      })
      
}
abc().then(result=>{
if(result.data.length>0){
    // alert("user email id exist")
console.log(result.data[0].password)
if(user_password.value==result.data[0].password){
    alert("login sucessful");
  window.location="expense_page.html"
}
else{
    alert("wrong password")
}

}
else{
    alert("user email id not exist 404")
}
console.log(result.data)
})

.catch(err=>{console.log(err)
alert("user already exist")
})

})



