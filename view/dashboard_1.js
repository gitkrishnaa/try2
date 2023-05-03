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
const expense_amount = document.getElementById("expense_amount");
const discription = document.getElementById("discription");
const catogary = document.getElementById("catogary");
const user_email_id = document.getElementById("user_email_id");
const save_expense = document.getElementById("save_expense");

save_expense.addEventListener("click", () => {
  console.log("expense data save button clicked");
  async function abc() {
    //authorize user by checking jwtkey aviliable ii locastorage or not
    const jwtToken = localStorage.getItem("jwtkey");
    if (!jwtToken) {
      const resp = confirm("please login/signup to acess this page");
      if (resp) {
        location.href = "login_page.html";
      } else {
        return;
      }
    }

    //this function return respusnse as promise which acess using .then(), .catch()
    return await axios.post("http://localhost:4200/user/expenseData", {
      expense_amount: expense_amount.value,
      discription: discription.value,
      catogary: catogary.value,
      user_email_id: user_email_id.value,
      Headers: { authorization_token: localStorage.getItem("jwtkey") },
    });
  }
  abc()
    .then((a) => {
      console.log(a, "expend data submitted sucessful");
      location.reload();
      //name and email show in dashboard
    })
    .catch((err) => console.log(err));
});

//display expense data
async function fetchAllExpenses() {
  const jwtToken = localStorage.getItem("jwtkey");
  if (!jwtToken) {
    alert("you are not login,jwt in not in localstroage");
    const userResponse = confirm("please login/signup to continoue");
    if (userResponse) {
      location.href = "login_page.html";
    } else {
      return;
    }
  }

  console.log("dashboard");
  const result = await axios.post("http://localhost:4200/user/getExpenseData", {
    Headers: {
      authorization_token: jwtToken,
    },
  });
  const userName = document.getElementById("user_name");
  const userEmail = document.getElementById("user_email");
  const userDetails = result.data.userDetails;
  userName.innerText = userDetails.name;
  userEmail.innerText = userDetails.email;
  console.log(result, "in fetchAllExpenses() function");

  //logout button
  //logic-just delete the localstorage delete key

  const appendDiv = document.getElementById("logout1");
  const logout_button = document.createElement("button");
  appendDiv.appendChild(logout_button);
  logout_button.innerText = "Logout";
  logout_button.addEventListener("click", () => {
    localStorage.removeItem("jwtkey")
    location.reload()
  });

  console.log(result.data.resp, "resposebyapi");
  const expenseData = result.data.resp;

  const all_data = expenseData;

  expenseData.forEach((element) => {
    const display = document.getElementById("display_data");
    const div1 = document.createElement("div");
    display.appendChild(div1);
    // div1.style.width="100px"

    const expense = document.createElement("span");
    div1.appendChild(expense);
    expense.innerText = element.expenses + " ";

    const description = document.createElement("span");
    div1.appendChild(description);
    description.innerText = element.description + " ";

    const catogary = document.createElement("span");
    div1.appendChild(catogary);
    catogary.innerText = element.catogary + " ";

    const delete_btn = document.createElement("button");
    div1.appendChild(delete_btn);
    delete_btn.innerText = "delete";
    delete_btn.id = element.id;

    delete_btn.addEventListener("click", (e) => {
      axios
        .post("http://localhost:4200/user/expenseData/" + e.target.id)
        .then((a) => {
          if (a.data == 0) {
            alert("expense not exist");
          }

          alert("expense deleted");
          console.log("delete ok", a);
          window.location.reload();
        })
        .catch((err) => {
          alert("somthing err, see in console ");
          console.log("delete not ok", err);
        });
    });

    const edit_btn = document.createElement("button");
    div1.appendChild(edit_btn);
    edit_btn.innerText = "edit";
    edit_btn.id = element.id;
    edit_btn.addEventListener("click", (e) => {
      console.log("edit expense button clicked", e.target.id);
      const expense_amount = document.getElementById("expense_amount");
      const discription = document.getElementById("discription");
      const catogary = document.getElementById("catogary");
      const user_email_id = document.getElementById("user_email_id");

      console.log(all_data, "edit expense data");

      axios
        .post("http://localhost:4200/user/editExpenseData/" + e.target.id, {
          expense_amount: expense_amount.value,
          discription: discription.value,
          catogary: catogary.value,
          id: e.target.id,
        })
        .then((a) => {
          console.log(a, "in edit api then");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err, "in edit api then");
        });
    });

    const br = document.createElement("br");
    div1.appendChild(edit_btn);
  });
}
fetchAllExpenses();
