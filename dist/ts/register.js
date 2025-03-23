import { signupApi } from "../functions/api";
import { executePostApi } from "./apiExecution";
const commonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Origin": "*"
};
if (localStorage.getItem("token")) {
    window.location.href = "/src/html/index.html";
}
async function postRequest(api, body) {
    const responseDataArray = await executePostApi(api, body, commonHeaders);
    const data = responseDataArray[1];
    localStorage.setItem("OTPtoken", data.OTPtoken);
    if (!(responseDataArray[0].status >= 200 && responseDataArray[0].status < 300)) {
        alert(data.message);
        return;
    }
    window.location.href = "../html/verify.html";
}
const registrationForm = document.getElementById("registrationForm");
console.log(registrationForm);
registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registrationForm);
    const formValues = Object.fromEntries(formData);
    if ((formValues.phoneNumber).toString().length != 10 || parseInt(formValues.phoneNumber) < 0) {
        alert("Please enter a valid phone number");
        location.reload();
    }
    const body = {
        username: formValues.username,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
        phoneNumber: parseInt(formValues.phoneNumber),
        dateOfBirth: formValues.dateOfBirth,
    };
    await postRequest(signupApi, body);
});
