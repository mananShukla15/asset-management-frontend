"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createButtons = createButtons;
exports.createButtons2 = createButtons2;
var fetchUserRoles_1 = require("../functions/fetchUserRoles");
var api_1 = require("../functions/api");
var apiExecution_1 = require("./apiExecution");
var helperFunctions_1 = require("../functions/helperFunctions");
var logoutButton = document.getElementById("logout");
(0, helperFunctions_1.isTokenAvailableOrNot)();
function displayContentBasedOnRoles(roles) {
    if (!roles.includes('Admin')) {
        document.getElementById("user-nav").style.display = "none";
        document.getElementById("asset-history-nav").style.display = "none";
        document.getElementById("asset-request-nav").style.display = "none";
    }
}
function appendChildToParent(parentNode) {
    var childNodes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        childNodes[_i - 1] = arguments[_i];
    }
    for (var _a = 0, childNodes_1 = childNodes; _a < childNodes_1.length; _a++) {
        var child = childNodes_1[_a];
        parentNode.appendChild(child);
    }
    return parentNode;
}
var roles = await (0, fetchUserRoles_1.default)();
displayContentBasedOnRoles(roles);
var assets = [];
function checkAdminOrNot() {
    return __awaiter(this, void 0, void 0, function () {
        var responseDataArray, roleArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, apiExecution_1.executeGetApi)(api_1.getRolesApi)];
                case 1:
                    responseDataArray = _a.sent();
                    roleArray = responseDataArray[1];
                    console.log(roleArray);
                    return [2 /*return*/, roleArray.includes("Admin")];
            }
        });
    });
}
var users;
function getDataOfUser(dropdownForUsers) {
    return __awaiter(this, void 0, void 0, function () {
        var selectTag, responseDataArray, i, optionTag;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    selectTag = document.createElement('select');
                    return [4 /*yield*/, (0, apiExecution_1.executeGetApi)(api_1.getAllUsersApi)];
                case 1:
                    responseDataArray = _a.sent();
                    users = responseDataArray[1];
                    selectTag.setAttribute('name', 'users');
                    selectTag.setAttribute('id', 'users');
                    for (i = 0; i < users.length; i++) {
                        optionTag = document.createElement('option');
                        optionTag.setAttribute('value', users[i].username);
                        optionTag.textContent = users[i].username;
                        selectTag = appendChildToParent(selectTag, optionTag);
                    }
                    dropdownForUsers = appendChildToParent(dropdownForUsers, selectTag);
                    return [2 /*return*/];
            }
        });
    });
}
function fetchAssets() {
    return __awaiter(this, void 0, void 0, function () {
        var responseDataArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, apiExecution_1.executeGetApi)(api_1.getAllAssetsApi)];
                case 1:
                    responseDataArray = _a.sent();
                    console.log(responseDataArray);
                    assets = responseDataArray[1];
                    console.log(assets);
                    return [4 /*yield*/, displayAssets(assets)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
await fetchAssets();
function createButtons(htmlNode, idName, className) {
    htmlNode.setAttribute('id', idName);
    htmlNode.setAttribute('class', className);
    return htmlNode;
}
function createButtons2(htmlNode, idName, className) {
    htmlNode.setAttribute('id', idName);
    htmlNode.setAttribute('class', className);
    return htmlNode;
}
function createOpenAndCloseButtons(className, idName, targetModal, buttonContent, disabled) {
    if (disabled === void 0) { disabled = false; }
    var buttonCell = document.createElement('td');
    var button = createButtons2(document.createElement('button'), idName, className);
    button.type = 'button';
    button.textContent = buttonContent;
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', targetModal);
    buttonCell = appendChildToParent(buttonCell, button);
    if (disabled) {
        button.disabled = true;
    }
    return buttonCell;
}
function pendingRequests(asset) {
    return __awaiter(this, void 0, void 0, function () {
        var pendingAssetsApi, responseDataArray, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(asset);
                    pendingAssetsApi = api_1.assetPendingApi + "".concat(asset.id);
                    return [4 /*yield*/, (0, apiExecution_1.executeGetApi)(pendingAssetsApi)];
                case 1:
                    responseDataArray = _a.sent();
                    res = responseDataArray[1];
                    return [2 /*return*/, res.message == "Your request is still pending"];
            }
        });
    });
}
function displayAssets(assets) {
    return __awaiter(this, void 0, void 0, function () {
        var tbody, addAssetBtn, isAdmin, _loop_1, _i, assets_1, asset, requestColumn, closeColumn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tbody = document.getElementById('assetTableBody');
                    addAssetBtn = document.getElementById('createAssets');
                    return [4 /*yield*/, checkAdminOrNot()];
                case 1:
                    isAdmin = _a.sent();
                    console.log(assets);
                    _loop_1 = function (asset) {
                        var row, idCell, nameCell, typeCell, ownerCell, openButtonCell, openButton, deleteButtonCell, pendingRequestOrNot, requestButtonCell;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    row = document.createElement('tr');
                                    idCell = document.createElement('td');
                                    idCell.textContent = asset.id.toString();
                                    nameCell = document.createElement('td');
                                    nameCell.textContent = asset.name;
                                    typeCell = document.createElement('td');
                                    typeCell.textContent = asset.assetType;
                                    ownerCell = document.createElement('td');
                                    ownerCell.textContent = 'Unassigned';
                                    openButtonCell = createOpenAndCloseButtons('btn btn-primary', "openButton", '#assetModal', 'Open');
                                    openButton = openButtonCell.firstChild;
                                    openButton.onclick = function () { return openAsset(asset); };
                                    if (!isAdmin) return [3 /*break*/, 1];
                                    deleteButtonCell = createOpenAndCloseButtons('btn btn-danger', "deleteButton", '#deleteModal', 'Delete');
                                    deleteButtonCell.firstChild.onclick = function () { return deleteAsset(asset.id); };
                                    ownerCell.textContent = asset.username || "Unassigned";
                                    row = appendChildToParent(row, idCell, nameCell, typeCell, ownerCell, openButtonCell, deleteButtonCell);
                                    return [3 /*break*/, 3];
                                case 1: return [4 /*yield*/, pendingRequests(asset)];
                                case 2:
                                    pendingRequestOrNot = _b.sent();
                                    requestButtonCell = createOpenAndCloseButtons('btn btn-secondary', "requestButton", '#requestModal', 'Request Asset');
                                    if (asset.username) {
                                        ownerCell.textContent = 'You';
                                        requestButtonCell.textContent = '';
                                        requestButtonCell.disabled = true;
                                    }
                                    else {
                                        if (pendingRequestOrNot) {
                                            requestButtonCell.textContent = 'Pending...';
                                            requestButtonCell.disabled = true;
                                        }
                                        else {
                                            requestButtonCell.firstChild.onclick = function () { return requestAsset(asset.id); };
                                        }
                                    }
                                    row = appendChildToParent(row, idCell, nameCell, typeCell, ownerCell, openButtonCell, requestButtonCell);
                                    _b.label = 3;
                                case 3:
                                    tbody = appendChildToParent(tbody, row);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, assets_1 = assets;
                    _a.label = 2;
                case 2:
                    if (!(_i < assets_1.length)) return [3 /*break*/, 5];
                    asset = assets_1[_i];
                    return [5 /*yield**/, _loop_1(asset)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    if (!isAdmin) return [3 /*break*/, 7];
                    return [4 /*yield*/, openModal(addAssetBtn)];
                case 6:
                    _a.sent();
                    requestColumn = document.getElementById('requestColumn');
                    if (requestColumn) {
                        requestColumn.parentNode.removeChild(requestColumn);
                    }
                    return [3 /*break*/, 8];
                case 7:
                    if (addAssetBtn) {
                        addAssetBtn.parentNode.removeChild(addAssetBtn);
                    }
                    closeColumn = document.getElementById('closeColumn');
                    if (closeColumn) {
                        closeColumn.parentNode.removeChild(closeColumn);
                    }
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function openModal(openModalButton) {
    return __awaiter(this, void 0, void 0, function () {
        var dropdownForAssetAssign, addAssetAssetName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dropdownForAssetAssign = document.createElement('div');
                    addAssetAssetName = document.getElementById('addAssetAssetName');
                    addAssetAssetName.textContent = "";
                    return [4 /*yield*/, getDataOfUser(dropdownForAssetAssign)];
                case 1:
                    _a.sent();
                    openModalButton.setAttribute('data-toggle', 'modal');
                    openModalButton.setAttribute('data-target', '#addAssetModal');
                    openModalButton.onclick = function () { return enterAssetDetails(dropdownForAssetAssign); };
                    return [2 /*return*/];
            }
        });
    });
}
function addAssetAssignDropDown(dropdown) {
    var addAssetDropDownForUsers = document.getElementById("addAssetDropDownForUsers");
    var tableBody = document.getElementById('addAssetConfigTableBody');
    tableBody.innerHTML = "";
    addAssetDropDownForUsers.innerHTML = "";
    var noUserPresent = false;
    var firstChild = dropdown.firstChild;
    (firstChild.childNodes).forEach(function (op) {
        var option = op;
        if (option.value == "noUser") {
            noUserPresent = true;
        }
    });
    if (!noUserPresent) {
        var optionTag = document.createElement('option');
        optionTag.selected = true;
        optionTag.setAttribute('value', 'noUser');
        optionTag.textContent = "No User";
        dropdown.firstChild.appendChild(optionTag);
    }
    addAssetDropDownForUsers.appendChild(dropdown);
}
function addRow() {
    var tableBody = document.getElementById('addAssetConfigTableBody');
    var newRow = document.createElement('tr');
    var idCell = document.createElement('td');
    idCell.innerHTML = "<input type='text' class='addAssetConfigDetails' required>";
    var nameCell = document.createElement('td');
    nameCell.innerHTML = "<input type='text' class='addAssetConfigDetails' required>";
    newRow = appendChildToParent(newRow, idCell, nameCell);
    tableBody.appendChild(newRow);
}
function addAsset(dropdown) {
    return __awaiter(this, void 0, void 0, function () {
        var getConfigDetail, assetType, configObj, i, firstChild, assignUser, addAssetApiBody, userId, responseDataArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getConfigDetail = document.getElementsByTagName('input');
                    assetType = document.getElementById('assetType');
                    configObj = {};
                    for (i = 1; i < getConfigDetail.length; i += 2) {
                        configObj[getConfigDetail[i].value] = getConfigDetail[i + 1].value;
                    }
                    firstChild = dropdown.firstChild;
                    assignUser = (firstChild.value == "noUser") ? undefined : firstChild.value;
                    addAssetApiBody = {
                        "name": getConfigDetail[0].value,
                        "assetType": assetType.value,
                        "config": configObj
                    };
                    if (assignUser) {
                        userId = getIdFromUsername(firstChild.value);
                        addAssetApiBody["userId"] = userId.toString();
                    }
                    return [4 /*yield*/, (0, apiExecution_1.executePostApi)(api_1.createAssetApi, addAssetApiBody)];
                case 1:
                    responseDataArray = _a.sent();
                    if (responseDataArray[0].status == 201) {
                        window.location.reload();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function enterAssetDetails(dropdown) {
    addAssetAssignDropDown(dropdown);
    var addRowBtn = document.getElementById('addRowBtn');
    addRowBtn.addEventListener('click', addRow);
    var addAssetBtn = document.getElementById('addAssetBtn');
    addAssetBtn.onclick = function () { return addAsset(dropdown); };
}
function deleteAsset(id) {
    return __awaiter(this, void 0, void 0, function () {
        var assetDeleteApi, responseDataArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    assetDeleteApi = api_1.deleteAssetApi + "".concat(id);
                    return [4 /*yield*/, (0, apiExecution_1.executeDeleteApi)(assetDeleteApi)];
                case 1:
                    responseDataArray = _a.sent();
                    assets = responseDataArray[1];
                    window.location.reload();
                    return [2 /*return*/];
            }
        });
    });
}
function addAssignUnassignButtons(asset) {
    var div = createButtons(document.createElement('div'), "", "modal-footer");
    var assignBtn = createButtons(document.createElement('button'), "assetAssignBtn", "btn btn-primary");
    assignBtn.textContent = 'Assign';
    var editBtn = createButtons(document.createElement('button'), "assetEditBtn", "btn btn-primary");
    editBtn.textContent = 'Edit';
    var saveBtn = createButtons(document.createElement('button'), "assetEditBtn", "btn btn-primary");
    saveBtn.textContent = 'Save';
    var unassignBtn = createButtons(document.createElement('button'), "assetUnassignBtn", "btn btn-danger");
    unassignBtn.textContent = 'Unassign';
    var addRowDiv = document.getElementById('addRowForEdit');
    addRowDiv.innerHTML = "";
    div = appendChildToParent(div, assignBtn, unassignBtn, editBtn);
    asset.username ? assignBtn.style.display = "none" : unassignBtn.style.display = "none";
    editBtn.onclick = function () { return editAssets(asset, saveBtn, div); };
    assignBtn.onclick = function () { return assetAssignToUser(asset.id.toString()); };
    unassignBtn.onclick = function () { return assetUnassign(asset.id.toString()); };
    return div;
}
function addRowInEditSection() {
    var tableBody = document.getElementById('configTableBody');
    var newRow = document.createElement('tr');
    var idCell = document.createElement('td');
    idCell.innerHTML = "<input type='text' class='editAssetConfigDetails' required>";
    var nameCell = document.createElement('td');
    nameCell.innerHTML = "<input type='text' class='editAssetConfigDetails' required>";
    newRow = appendChildToParent(newRow, idCell, nameCell);
    tableBody.appendChild(newRow);
}
function saveAssetDetails(tableBody) {
    return __awaiter(this, void 0, void 0, function () {
        var id, name, assetType, editAssetConfigDetails, assignedAssetOrNot, configObj, i, editAssetApiBody, userId, updateApi, responseDataArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = document.getElementById('modalAssetId').textContent;
                    name = document.getElementById('editAssetName');
                    assetType = document.getElementById('editAssetType');
                    editAssetConfigDetails = tableBody.getElementsByTagName('input');
                    assignedAssetOrNot = document.getElementById('modalAssetOwner');
                    configObj = {};
                    for (i = 0; i < editAssetConfigDetails.length; i += 2) {
                        if (editAssetConfigDetails[i].value.trim().length && editAssetConfigDetails[i + 1].value.trim().length) {
                            configObj[editAssetConfigDetails[i].value] = editAssetConfigDetails[i + 1].value;
                        }
                    }
                    editAssetApiBody = {
                        "name": name.value,
                        "assetType": assetType.value,
                        "config": configObj
                    };
                    if (assignedAssetOrNot.textContent != 'Unassigned') {
                        userId = getIdFromUsername(assignedAssetOrNot.textContent);
                        editAssetApiBody["userId"] = userId.toString();
                    }
                    updateApi = api_1.updateAssetApi + "".concat(id);
                    return [4 /*yield*/, (0, apiExecution_1.executePutApi)(updateApi, editAssetApiBody)];
                case 1:
                    responseDataArray = _a.sent();
                    if (responseDataArray[0].status == 200) {
                        window.location.reload();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function convertTdCellToInput(tableBody) {
    var tableDataCells = tableBody.getElementsByTagName('td');
    for (var i = 0; i < tableDataCells.length; i++) {
        var value = tableDataCells[i].textContent;
        tableDataCells[i].innerHTML = "<input type='text' class='editAssetConfigDetails' value=\"".concat(value, "\">");
    }
}
function editAssets(asset, saveBtn, div) {
    var userDropdown = document.getElementById('dropDownForUsers');
    var addRowDiv = document.getElementById('addRowForEdit');
    var addRowBtnInEditSection = createButtons(document.createElement('button'), "addRowInEditSection", "btn btn-primary");
    var assetName = document.getElementById('modalAssetName');
    var assetType = document.getElementById('modalAssetType');
    var tableBody = document.getElementById('configTableBody');
    userDropdown.innerHTML = "";
    div.innerHTML = "";
    div.appendChild(saveBtn);
    saveBtn.onclick = function () { return saveAssetDetails(tableBody); };
    addRowBtnInEditSection.innerHTML = "+";
    addRowBtnInEditSection.onclick = function () { return addRowInEditSection(); };
    addRowDiv.appendChild(addRowBtnInEditSection);
    assetName.innerHTML = "<input type=\"text\" value=".concat(asset.name, " id=\"editAssetName\" required>");
    assetType.innerHTML = "<select id=\"editAssetType\">\n                    <option value=\"Hardware\">Hardware</option>\n                    <option value=\"Software\">Software</option>\n                </select>";
    convertTdCellToInput(tableBody);
}
function getIdFromUsername(username) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            return users[i].id;
        }
    }
    return undefined;
}
function assetAssignToUser(id) {
    return __awaiter(this, void 0, void 0, function () {
        var user, userId, apiBody, responseDataArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = document.getElementById('users').value;
                    userId = getIdFromUsername(user);
                    apiBody = {
                        "assetId": id,
                        "userId": userId
                    };
                    return [4 /*yield*/, (0, apiExecution_1.executePostApi)(api_1.assetAssignApi, apiBody)];
                case 1:
                    responseDataArray = _a.sent();
                    if (responseDataArray[0].status == 201) {
                        window.location.reload();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function openAsset(asset) {
    return __awaiter(this, void 0, void 0, function () {
        var assignUnassignCloseBtnBody, modalAssetId, modalAssetName, modalAssetType, modalAssetOwner, tableBody, dropdownForUsers, closeBtn, key, row, objectKeyCell, objectValueCell, divElementForButtons, isAdmin, divElement, assetAssignToUser_1, divForClose;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    assignUnassignCloseBtnBody = document.getElementById("assignUnassignCloseBtnBody");
                    modalAssetId = document.getElementById("modalAssetId");
                    modalAssetName = document.getElementById("modalAssetName");
                    modalAssetType = document.getElementById("modalAssetType");
                    modalAssetOwner = document.getElementById("modalAssetOwner");
                    tableBody = document.getElementById('configTableBody');
                    dropdownForUsers = document.getElementById('dropDownForUsers');
                    closeBtn = createButtons(document.createElement('button'), "close", "btn btn-secondary");
                    closeBtn.setAttribute('data-dismiss', 'modal');
                    closeBtn.textContent = 'Close';
                    dropdownForUsers.innerHTML = "";
                    modalAssetId.textContent = asset.id.toString();
                    modalAssetName.textContent = asset.name;
                    modalAssetType.textContent = asset.assetType;
                    modalAssetOwner.textContent = asset.username || 'Unassigned';
                    tableBody.innerHTML = "";
                    for (key in asset.config) {
                        row = document.createElement('tr');
                        objectKeyCell = document.createElement('td');
                        objectKeyCell.textContent = key;
                        objectValueCell = document.createElement('td');
                        objectValueCell.textContent = asset.config[key];
                        row = appendChildToParent(row, objectKeyCell, objectValueCell);
                        tableBody.appendChild(row);
                    }
                    assignUnassignCloseBtnBody.innerHTML = "";
                    divElementForButtons = document.createElement('div');
                    return [4 /*yield*/, checkAdminOrNot()];
                case 1:
                    isAdmin = _a.sent();
                    if (!isAdmin) return [3 /*break*/, 4];
                    divElement = addAssignUnassignButtons(asset);
                    if (!!asset.username) return [3 /*break*/, 3];
                    assetAssignToUser_1 = document.getElementById('assetAssignToUser');
                    if (assetAssignToUser_1) {
                        assetAssignToUser_1.parentNode.removeChild(assetAssignToUser_1);
                    }
                    return [4 /*yield*/, getDataOfUser(dropdownForUsers)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    divElementForButtons.appendChild(divElement);
                    _a.label = 4;
                case 4:
                    divForClose = createButtons(document.createElement('div'), "", "modal-footer");
                    divForClose.appendChild(closeBtn);
                    divElementForButtons.appendChild(divForClose);
                    assignUnassignCloseBtnBody.appendChild(divElementForButtons);
                    return [2 /*return*/];
            }
        });
    });
}
function assetUnassign(id) {
    return __awaiter(this, void 0, void 0, function () {
        var unassignAssetApi;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    unassignAssetApi = api_1.assetUnassignApi + "".concat(id);
                    return [4 /*yield*/, (0, apiExecution_1.executePostApi)(unassignAssetApi, {})];
                case 1:
                    _a.sent();
                    window.location.reload();
                    return [2 /*return*/];
            }
        });
    });
}
function requestAsset(assetId) {
    return __awaiter(this, void 0, void 0, function () {
        var apiHeaders, responseDataArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiHeaders = {
                        "Content-Type": "application/json",
                        "Authorization": "".concat(localStorage.getItem('token'))
                    };
                    return [4 /*yield*/, (0, apiExecution_1.executePostApi)(api_1.assetRequestApi, { assetId: assetId }, apiHeaders)];
                case 1:
                    responseDataArray = _a.sent();
                    if (!responseDataArray[0].ok) {
                        alert(responseDataArray[1].message);
                        return [2 /*return*/];
                    }
                    alert("Asset request created successfully");
                    window.location.reload();
                    return [2 /*return*/];
            }
        });
    });
}
(0, helperFunctions_1.logout)(logoutButton);
