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

import * as variables from "./variable.js"
const webHost=variables.apiHost
console.log(webHost,"variale.js")


const user_mobile = document.getElementById("user_mobile");
const user_password = document.getElementById("user_password");
const login_btn = document.getElementById("login_submit_btn");

login_btn.addEventListener("click", () => {
  console.log("login button is clicked");
  async function abc() {
    //this function return respusnse as promise which acess using .then(), .catch()
    // const jwtToken=localStorage.getItem("jwtkey")

    return await axios.post(webHost+"/user/login", {
      email: user_email.value,

      password: user_password.value,
      //sending jwt token from localstroge jwtkey
    });
  }

  abc()
    .then((result) => {
      console.log(result)
      const email=user_email.value;
      const status=result.data.response.status
     const message=result.data.response.message
      if (status) {
          //jwt token store in localstrore with keyword jwt;
          localStorage.setItem("jwtkey", result.data.token);
          console.log("jwt token is localstorge with key= jwtkey");

          window.location = "dashboard.html";
        alert(message)
      }
      else{
        alert(message)
      }
      
    })

    .catch((err) => {
      console.log(err);
      alert("somting backend problem or user not exist");
    });
});

