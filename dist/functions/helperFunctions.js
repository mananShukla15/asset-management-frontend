"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyFunction = emptyFunction;
exports.isTokenAvailableOrNot = isTokenAvailableOrNot;
exports.displayContentBasedOnRoles = displayContentBasedOnRoles;
exports.logout = logout;
function emptyFunction() { }
function isTokenAvailableOrNot() {
    if (localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
        window.location.href = "/src/html/login.html";
    }
}
function displayContentBasedOnRoles(roles) {
    console.log(roles);
    if (!roles.includes('Admin')) {
        document.getElementById("user-nav").style.display = "none";
        document.getElementById("asset-history-nav").style.display = "none";
        document.getElementById("asset-request-nav").style.display = "none";
    }
}
function logout(logoutElement) {
    logoutElement.addEventListener("click", function () {
        localStorage.clear();
        window.location.reload();
    });
}
