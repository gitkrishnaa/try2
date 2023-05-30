



////////////////////////////////////////////////////////////////
import * as variables from "./variable.js";
const webHost = variables.apiHost;
console.log(webHost, "variale.js");

////////////////////////////////////////////////////////////////




const download_data=()=>{
    console.log("download data")
    const div_of_download_data = document.getElementById(
        "download_data"
      );
      
console.log(div_of_download_data)
      const download_btn = document.createElement("button");
      download_btn.innerText = "download data";
      div_of_download_data.appendChild(download_btn);
      console.log(download_btn)
      download_btn.addEventListener("click",async()=>{

try {
    const resposne = await axios.post(webHost + "/userData/p/download_data",
        {},
        {
          headers: { Authorization: localStorage.getItem("jwtkey") },
        }
      );



const status=resposne.data.status
const message=resposne.data.message
if(status){
    const download_link=resposne.data.data.Location
    alert(message,"sucessful done")
    window.open(download_link, '_blank');
}
else{
    alert(message+"error in backend")
}
console.log("response from download_data()",resposne)
}
catch (error) {
    alert("not sucessful,frontend error")
    console.log(error);
}

      })
      console.log("download_data end")
}
download_data()