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
const user_name=document.getElementById("user_name")
const user_email=document.getElementById("user_email")
const user_mobile=document.getElementById("user_mobile")
const user_password=document.getElementById("user_password")
const sign_up_btn=document.getElementById("sign_up_btn")



sign_up_btn.addEventListener("click",()=>{

  async function abc(){
    //this function return respusnse as promise which acess using .then(), .catch()
    return await axios.post('http://localhost:4200/user/signup', {
       name:user_name.value,
       email:user_email.value,
       mobile:user_mobile.value,
       password:user_password.value
      })
      
}
abc().then(a=>{
  console.log(a,"ok")
  alert("sign up sucessfull")
})
.catch(err=>{console.log(err)
alert("user already exist")
})

})



