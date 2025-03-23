import { resetPasswordApi } from "../functions/api";
import { executePostApi } from "./apiExecution";
const commonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Origin": "*",
    "Authorization": localStorage.getItem("resetPasswordToken")
};
if (localStorage.getItem("token") != null) {
    window.location.href = "/src/html/index.html";
}
if (!localStorage.getItem("username")) {
    window.location.href = "/src/html/forgetPassword.html";
}
async function postRequest(api, body) {
    console.log(body);
    const responseDataArray = await executePostApi(api, body, commonHeaders);
    const data = responseDataArray[1];
    if (!(responseDataArray[0].status >= 200 && responseDataArray[0].status < 500)) {
        alert(data.message);
        return;
    }
    else {
        window.location.href = "/src/html/login.html";
    }
}
const resetPasswordForm = document.getElementById('reset-password-form');
resetPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(resetPasswordForm);
    const formValues = Object.fromEntries(formData);
    const body = {
        otp: formValues.otp,
        password: formValues.newPassword,
        confirmPassword: formValues.confirmPassword,
        username: localStorage.getItem('username')
    };
    await postRequest(resetPasswordApi, body);
});
