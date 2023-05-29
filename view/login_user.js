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
const login_btn = document.getElementById("login_btn");

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
      const userData = result.data.a;
      console.log(userData, "userdataresponse", result);
      if (userData.length > 0) {
        // alert("user email id exist")
        console.log(userData[0].password);
        if (user_password.value == userData[0].password) {
          alert("login sucessful");

          //jwt token store in localstrore with keyword jwt;
          localStorage.setItem("jwtkey", result.data.token);
          console.log("jwt token is localstorge with key= jwtkey");

          window.location = "dashboard.html";
        } else {
          alert("wrong password");
        }
      } else {
        alert("user email id not exist 404");
      }
      console.log(result);
    })

    .catch((err) => {
      console.log(err);
      alert("somting bckend problem or user not exist");
    });
});

