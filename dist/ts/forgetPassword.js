import { forgetPasswordApi } from "../functions/api";
import { executePostApi } from "./apiExecution";
const commonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Origin": "*"
};
if (localStorage.getItem("token") != null) {
    window.location.href = "/src/html/index.html";
}
async function postRequest(api, body) {
    console.log(body);
    const responseDataArray = await executePostApi(api, body, commonHeaders);
    const data = responseDataArray[1];
    if (!(responseDataArray[0].status >= 200 && responseDataArray[0].status < 300)) {
        alert(data.message);
        return;
    }
    if (data.username) {
        localStorage.setItem('username', data.username);
        window.location.href = "/src/html/resetPassword.html";
    }
}
const forgetPasswordForm = document.getElementById('forgetPasswordForm');
forgetPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(forgetPasswordForm);
    const formValues = Object.fromEntries(formData);
    const body = {
        username: formValues.username,
    };
    await postRequest(forgetPasswordApi, body);
});
