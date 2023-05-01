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
const expense_amount=document.getElementById("expense_amount")
const discription=document.getElementById("discription")
const catogary=document.getElementById("catogary")

const user_email_id=document.getElementById("user_email_id")

const save_expense=document.getElementById("save_expense")


save_expense.addEventListener("click",()=>{
console.log("expense data save button clicked")
  async function abc(){
    //this function return respusnse as promise which acess using .then(), .catch()
    return await axios.post('http://localhost:4200/user/expenseData', {
        expense_amount:expense_amount.value,
        discription:discription.value,
        catogary:catogary.value,
        user_email_id:user_email_id.value
      })
      
}
abc().then(a=>{
    console.log(a,"expend data submitted sucessful")
  location.reload()
})
.catch(err=>console.log(err))
})


//display expense data
async function fetchAllExpenses(){
const result=await axios.get("http://localhost:4200/user/getExpenseData")

console.log(result)

result.data.forEach(element => {
    
const display=document.getElementById("display_data");
const div1=document.createElement("div")
display.appendChild(div1)
// div1.style.width="100px"


const expense=document.createElement("span")
div1.appendChild(expense)
expense.innerText=element.expenses+" "

const description=document.createElement("span")
div1.appendChild(description)
description.innerText=element.description+" "


const catogary=document.createElement("span")
div1.appendChild(catogary)
catogary.innerText=element.catogary+" "

const delete_btn=document.createElement("button")
div1.appendChild(delete_btn)
delete_btn.innerText="delete"

const edit_btn=document.createElement("button")
div1.appendChild(edit_btn)
edit_btn.innerText="edit"

const br=document.createElement("br")
div1.appendChild(edit_btn)
});
}
fetchAllExpenses()
