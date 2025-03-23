import { verifyUserViaOtpApi } from "../functions/api";
import { executePostApi } from "./apiExecution";
if (!localStorage.getItem("OTPtoken")) {
    location.href = '../html/register.html';
}
async function postRequest(api, body) {
    const apiHeaders = {
        'Authorization': `${localStorage.getItem('OTPtoken')}`,
        'Content-Type': 'application/json'
    };
    const responseDataArray = await executePostApi(api, body, apiHeaders);
    if (responseDataArray[0].status >= 200 && responseDataArray[0].status < 300) {
        alert("user created successfully");
        window.location.href = "/src/html/login.html";
    }
    else {
        alert((responseDataArray[1]).message);
        window.location.reload();
    }
}
const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const getOTP = document.getElementById("otp").value;
    let otp = Number(getOTP);
    await postRequest(verifyUserViaOtpApi, { otp: otp });
});
