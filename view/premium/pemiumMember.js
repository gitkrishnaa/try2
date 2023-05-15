const if_premiumUser=async()=>{
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
const buyPremium_button=document.getElementById("rzp-button1");
buyPremium_button.remove()
// alert("user is premium")

//adding premium featurs
const div_of_premium_feature=document.getElementById("premium_feature_div")
div_of_premium_feature.innerText="you are premium user"


const fetchAlluser_btn=document.createElement("button");
fetchAlluser_btn.innerText="fetch all user expense";
div_of_premium_feature.appendChild(fetchAlluser_btn)
fetchAlluser_btn.addEventListener("click",async ()=>{

try {
    const resposne=await axios.post("http://localhost:4200/userData/p/Alluser", {
    },
    {   
    headers:{"Authorization":localStorage.getItem("jwtkey")}    
    })

console.log("premium feature-all user expenses",resposne)
const final_data=resposne.data.data;
console.log("final_data",final_data)
const display_html_div=document.getElementById("display_premium_feature_data");

final_data.forEach((d)=>{
   const div=document.createElement("div");
display_html_div.appendChild(div);

const name=document.createElement("span");
name.innerText=d.name+" ";
div.appendChild(name);
name.style.minWidth="200px"
name.style.border="2px solid black"


const email=document.createElement("span");
email.innerText=d.email+" ";
div.appendChild(email);
email.style.width="250px"
email.style.border="2px solid black"


const totalExpense=document.createElement("span");
totalExpense.innerText=d.totalExpenses+" ";
div.appendChild(totalExpense);
totalExpense.style.width="100px"
totalExpense.style.border="2px solid black"



})




} catch (error) {
    
}

})




}
else{
    // alert("user is not premium")
}
}     
catch(error){

}
}
if_premiumUser()