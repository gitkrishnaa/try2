module.exports.is_env_data_aviliable=(...args)=>{

let status=true;
args.forEach((data,i)=>{
if(!data){
    console.log("message - the dotEnv variable not avilible in .env file at ",[i],"th postion in passing agrument in this function")
    throw new Error("message - the dotEnv variable not avilible in .env file or something error")
    status=false
return;
}


})
if(status){
    console.log(["status","sucessful","given .env variale exist"],args)
}
}