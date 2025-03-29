import {IBodyStructureForAPI, ILoginToken} from "../functions/interface.js";
import {loginApi} from "../functions/api.js";
import {executePostApi} from "./apiExecution.js";
const commonHeaders  : HeadersInit =  {
    "Content-Type": "application/json",
    "Access-Control-Origin": "*"
}
if (localStorage.getItem("token")!=null) {
    window.location.href = "../../index.html"
}

async function postRequest(api:string,body:IBodyStructureForAPI): Promise<void>{
    const responseDataArray  = await executePostApi(api,body,commonHeaders);

    const data: ILoginToken = responseDataArray[1];
    if(!(responseDataArray[0].status >= 200 && responseDataArray[0].status < 300)){
        alert(data.message)
        return;
    }
    if(data.token){
        localStorage.setItem('token', data.token);
        window.location.href = "../../index.html";
    }
}
const loginForm : HTMLFormElement = <HTMLFormElement>document.getElementById('loginForm');
loginForm.addEventListener("submit", async (e: Event): Promise<void> => {
    e.preventDefault();
    const formData: FormData = new FormData(loginForm);
    const formValues:{ [k: string]: FormDataEntryValue } = {};
    formData.forEach((value,key)=>{
        formValues[key] = value;
    })
    const body : IBodyStructureForAPI = {
        username:formValues.username,
        password:formValues.password
    };
    await postRequest(loginApi, body);
});