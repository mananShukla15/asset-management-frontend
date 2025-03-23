import fetchUserRoles from '../functions/fetchUserRoles';
import { assetHistoryApi } from "../functions/api";
import { executeGetApi } from "./apiExecution";
import { createTable } from "./tables";
import { emptyFunction, isTokenAvailableOrNot, logout } from "../functions/helperFunctions.ts";
const logoutElement = document.getElementById("logout");
isTokenAvailableOrNot();
const roles = await fetchUserRoles();
if (!roles.includes("Admin")) {
    location.href = '/src/html/index.html';
}
async function fetchAssetHistory() {
    const responseDataArray = await executeGetApi(assetHistoryApi);
    let assets = responseDataArray[1];
    console.log(assets);
    displayAssetHistory(assets);
}
function displayAssetHistory(assetHistory) {
    let tbody = document.getElementById('asset-history');
    const tableHead = document.getElementById('table-head');
    tbody.innerHTML = '';
    createTable(tableHead, tbody, assetHistory, [emptyFunction], false, [], [], []);
}
await fetchAssetHistory();
logout(logoutElement);
