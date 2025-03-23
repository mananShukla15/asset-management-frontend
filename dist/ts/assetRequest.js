import { assetRequestApi, assetUpdateStatusApi } from "../functions/api";
import { executeGetApi, executePostApi } from "./apiExecution";
import { createTable } from "./tables";
import { isTokenAvailableOrNot, logout } from "../functions/helperFunctions";
isTokenAvailableOrNot();
const logoutElement = document.getElementById("logout");
async function requestAccept(asset) {
    const apiBody = {
        "id": asset.id,
        "status": "Approved"
    };
    console.log(apiBody, asset);
    const responseDataArray = await executePostApi(assetUpdateStatusApi, apiBody);
    const res = responseDataArray[1];
    if (!(responseDataArray[0].status >= 200 && responseDataArray[0].status < 300)) {
        alert(res.message);
    }
    window.location.reload();
}
async function requestReject(asset) {
    const apiBody = {
        "id": asset.id,
        "status": "Disapproved"
    };
    const responseDataArray = await executePostApi(assetUpdateStatusApi, apiBody);
    const res = responseDataArray[1];
    if (!(responseDataArray[0].status >= 200 && responseDataArray[0].status < 300)) {
        alert(res.message);
    }
    window.location.reload();
}
async function fetchAssetsRequests() {
    const responseDataArray = await executeGetApi(assetRequestApi);
    pendingRequests = responseDataArray[1];
    console.log(responseDataArray);
    console.log(pendingRequests);
    await displayAssetsRequests(pendingRequests);
}
let pendingRequests = [];
await fetchAssetsRequests();
async function displayAssetsRequests(pendingRequests) {
    let tbody = document.getElementById('assetRequestTableBody');
    const tableHead = document.getElementById('table-head');
    createTable(tableHead, tbody, pendingRequests, [requestAccept, requestReject], true, ["Accept", "Reject"], ["btn btn-primary", "btn btn-danger"], []);
}
logout(logoutElement);
