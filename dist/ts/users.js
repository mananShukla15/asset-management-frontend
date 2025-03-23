import fetchUserRoles from '../functions/fetchUserRoles';
import { createUserViaAdminApi, deleteUserApi } from "../functions/api";
import { executeDeleteApi, executePostApi } from "./apiExecution";
import { createTable } from "./tables";
import { users } from "../functions/getUsers";
import { isTokenAvailableOrNot, logout } from "../functions/helperFunctions";
isTokenAvailableOrNot();
const logoutElement = document.getElementById("logout");
const roles = await fetchUserRoles();
if (!roles.includes("Admin")) {
    location.href = '/src/html/index.html';
}
displayUsers(users);
console.log("users", users);
async function deleteUser(user) {
    const deleteUser = deleteUserApi + `${user.id}`;
    const responseDataArray = await executeDeleteApi(deleteUser);
    if (responseDataArray[0].ok) {
        console.log(`User ${user.id} deleted successfully`);
        displayUsers(users);
        window.location.reload();
    }
    else {
        console.log('Failed to delete user');
    }
}
function displayUsers(users) {
    const tbody = document.getElementById('userTableBody');
    const addUserBtn = document.getElementById('createUser');
    const tableHead = document.getElementById('table-head');
    addUserBtn.setAttribute('data-toggle', 'modal');
    addUserBtn.setAttribute('data-target', '#addUserModal');
    createTable(tableHead, tbody, users, [deleteUser], true, ["Delete"], ["btn btn-danger"], ["Delete"]);
}
async function createUserByAdmin(api, body) {
    const responseDataArray = await executePostApi(api, body);
    const data = responseDataArray[1];
    if (!(responseDataArray[0].status >= 200 && responseDataArray[0].status < 300)) {
        alert(data.message);
        return;
    }
    window.location.reload();
}
const addUserForm = document.getElementById("addUserForm");
addUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(addUserForm);
    const formValues = Object.fromEntries(formData);
    const getRole = document.getElementById('role');
    const roleValue = getRole.value;
    if ((formValues.phoneNumber).toString().length != 10 || parseInt(formValues.phoneNumber) < 0) {
        alert("Please enter a valid phone number");
        location.reload();
    }
    const body = {
        username: formValues.username,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        role: [roleValue ?? ""],
        password: formValues.password,
        phoneNumber: parseInt(formValues.phoneNumber),
        dateOfBirth: formValues.dateOfBirth,
    };
    console.log(body);
    await createUserByAdmin(createUserViaAdminApi, body);
});
logout(logoutElement);
