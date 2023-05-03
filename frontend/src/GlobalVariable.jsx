import Cookies from "js-cookie";

const GetToken=()=>{
 const token = Cookies.get('token');
 return token;   
}

var  ProjectID;
const setProjectID = (data) => {

}



export default ProjectID;
export  {GetToken,setProjectID};
