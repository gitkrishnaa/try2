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
    const resposne=await axios.post("http://localhost:4200/user/getUserData", {
        expense_amount: expense_amount.value,
        discription: discription.value,
        catogary: catogary.value,
        user_email_id: user_email_id.value,
        Headers: { authorization_token: localStorage.getItem("jwtkey") },
      },
      {
        headers: {
          'Authorization': localStorage.getItem("jwtkey") 
        }
      }
      
      )

      console.log(resposne)

//deketeing bu premieum button
const status=resposne.data[0].premium_user
if(status){
    

const buyPremium_button=document.getElementById("rzp-button1");
buyPremium_button.remove()
alert("user is premium")

}

else{
    alert("user is not premium")
}

     
} catch (error) {
    console.log(error)
}
   
}
user_info_load()