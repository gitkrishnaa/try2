const x=axios.post('http://localhost:4200/user/signupApi', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
x.then(a=>{console.log(a,"yghg")})

async function abc(){
    const x=await axios.post('http://localhost:4200/user/signupApi', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      console.log(x,"sync")
}
abc()