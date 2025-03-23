import { loginApi } from "../functions/api";
import { executePostApi } from "./apiExecution";
const commonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Origin": "*"
};
if (localStorage.getItem("token") != null) {
    window.location.href = "/src/html/index.html";
}
async function postRequest(api, body) {
    const responseDataArray = await executePostApi(api, body, commonHeaders);
    const data = responseDataArray[1];
    if (!(responseDataArray[0].status >= 200 && responseDataArray[0].status < 300)) {
        alert(data.message);
        return;
    }
    if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = "/src/html/index.html";
    }
}
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const formValues = {};
    formData.forEach((value, key) => {
        formValues[key] = value;
    });
    const body = {
        username: formValues.username,
        password: formValues.password
    };
    await postRequest(loginApi, body);
});
