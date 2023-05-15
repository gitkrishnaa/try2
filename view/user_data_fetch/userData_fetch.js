console.log("user data")
const user_info_load=async()=>{
    const jwtToken = localStorage.getItem("jwtkey");
    if (!jwtToken) {
      const resp = confirm("please login/signup to access this page");
      if (resp) {
        location.href = "login_page.html";
      } else {
        return;
      }
    }

try {
    const resposne=await axios.post("http://localhost:4200/userData/p/user", {
      },
      {   
      headers:{"Authorization":localStorage.getItem("jwtkey")}    
      }
      
      )

      console.log(resposne)

//deleteing buy premieum button
const status=resposne.data[0].premium_user
if(status){

// alert("user is premium")
}
else{
    // alert("user is not premium")
}
     

// user eami name and toexpense show in dashboard.html
 const userName = document.getElementById("user_name");
  const userEmail = document.getElementById("user_email");
  const userTotal_expees = document.getElementById("user_TotalExoenses");

  // console.log(resposne.data[0].email)
  const userDetails = resposne.data[0]
  userName.innerText = userDetails.name;
  userEmail.innerText = userDetails.email;
  userTotal_expees.innerText=userDetails.totalExpenses








} catch (error) {
    console.log(error)
}
   
}
user_info_load()