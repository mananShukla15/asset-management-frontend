import fetchUserRoles from '../functions/fetchUserRoles.js';
import {displayContentBasedOnRoles, isTokenAvailableOrNot, logout} from "../functions/helperFunctions.js";
import {profileDetails} from "../functions/getProfileDetails.js";

const logoutElement:HTMLElement = document.getElementById("logout")!;
isTokenAvailableOrNot()

const roles: string[] = await fetchUserRoles();
console.log(roles)
displayContentBasedOnRoles(roles);

async function fetchUserProfile() : Promise<void> {
    const userData = profileDetails;
    console.log(userData);
    (<HTMLElement>document.getElementById('username')).textContent = userData.username || "N/A";
    (<HTMLElement>document.getElementById('fullName')).textContent = userData.firstName + " " + userData.lastName || "N/A";
    (<HTMLElement>document.getElementById('email')).textContent = userData.email || "N/A";
    // (document.getElementById('department') as HTMLElement).textContent = userData.department || "N/A";
    (<HTMLElement>document.getElementById('phoneNumber')).textContent = userData.phoneNumber || "N/A";
    (<HTMLElement>document.getElementById('dob')).textContent = userData.dateOfBirth.substring(0,10) || "N/A";
    (<HTMLElement>document.getElementById('joiningDate')).textContent = userData.joiningDate.substring(0,10) || "N/A";
}

logout(logoutElement);
await fetchUserProfile();