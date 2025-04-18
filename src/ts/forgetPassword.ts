import {IForgetPassword, IForgetPasswordToken} from "../functions/interface.js";
import {forgetPasswordApi} from "../functions/api.js";
import {executePostApi} from "./apiExecution.js";

const commonHeaders  : HeadersInit =  {
    "Content-Type": "application/json",
    "Access-Control-Origin": "*"
}

if (localStorage.getItem("token")!=null) {
    window.location.href = "../../index.html"
}

async function postRequest(api:string,body:IForgetPassword): Promise<void>{
    console.log(body);
    const responseDataArray  = await executePostApi(api,body,commonHeaders);

    const data: IForgetPasswordToken = responseDataArray[1];
    if(!(responseDataArray[0].status >= 200 && responseDataArray[0].status < 300)){
        alert(data.message)
        return;
    }
    if(data.username){
        localStorage.setItem('username', data.username);
        window.location.href = "../../resetPassword.html";
    }
}

const forgetPasswordForm : HTMLFormElement = <HTMLFormElement>document.getElementById('forgetPasswordForm');
forgetPasswordForm.addEventListener("submit", async (e: Event): Promise<void> => {
    e.preventDefault();
    const formData: FormData = new FormData(forgetPasswordForm);
    const formValues : { [k : string] : FormDataEntryValue } = Object.fromEntries(formData);
    const body : IForgetPassword = {
        username:formValues.username,
    };
    await postRequest(forgetPasswordApi, body);
});






