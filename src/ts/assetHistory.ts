import fetchUserRoles from '../functions/fetchUserRoles.js'
import {IAssetHistory} from "../functions/interface.js";
import {assetHistoryApi} from "../functions/api.js";
import {executeGetApi} from "./apiExecution.js";
import {createTable} from "./tables.js";
import {emptyFunction, isTokenAvailableOrNot, logout} from "../functions/helperFunctions.js";

const logoutElement:HTMLElement = document.getElementById("logout")!;

isTokenAvailableOrNot()
const roles : string[] = await fetchUserRoles();
if(!roles.includes("Admin")){
    location.href = '../../index.html'
}


async function fetchAssetHistory(): Promise<void> {
    const responseDataArray  = await executeGetApi(assetHistoryApi);
    let assets:IAssetHistory[] = responseDataArray[1];
    console.log(assets)
    displayAssetHistory(assets);
}

function displayAssetHistory(assetHistory: IAssetHistory[]): void {
    let tbody : HTMLElement = <HTMLElement>document.getElementById('asset-history');
    const tableHead:HTMLElement = document.getElementById('table-head')!;
    tbody.innerHTML = '';
    createTable(tableHead,tbody,assetHistory,[emptyFunction],false,[],[],[]);
}

await fetchAssetHistory()
logout(logoutElement);

