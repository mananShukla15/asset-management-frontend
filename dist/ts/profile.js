import fetchUserRoles from '../functions/fetchUserRoles';
import { displayContentBasedOnRoles, isTokenAvailableOrNot, logout } from "../functions/helperFunctions";
import { profileDetails } from "../functions/getProfileDetails.ts";
const logoutElement = document.getElementById("logout");
isTokenAvailableOrNot();
const roles = await fetchUserRoles();
console.log(roles);
displayContentBasedOnRoles(roles);
async function fetchUserProfile() {
    const userData = profileDetails;
    console.log(userData);
    document.getElementById('username').textContent = userData.username || "N/A";
    document.getElementById('fullName').textContent = userData.firstName + " " + userData.lastName || "N/A";
    document.getElementById('email').textContent = userData.email || "N/A";
    // (document.getElementById('department') as HTMLElement).textContent = userData.department || "N/A";
    document.getElementById('phoneNumber').textContent = userData.phoneNumber || "N/A";
    document.getElementById('dob').textContent = userData.dateOfBirth.substring(0, 10) || "N/A";
    document.getElementById('joiningDate').textContent = userData.joiningDate.substring(0, 10) || "N/A";
}
logout(logoutElement);
await fetchUserProfile();
