import { createButtons } from "../functions/createButtons";
import { profileDetails } from "../functions/getProfileDetails";
function isKeyValidOrNot(key) {
    return key != 'id' && key != 'createdAt' && key != 'joiningDate' && key != 'userId' && key != 'assetId';
}
function isKeyDateOrNot(key) {
    return key == 'dateOfBirth' || key == 'assignedAt' || key == 'unassignedAt';
}
function convertCamelCaseToPascalCase(columnName) {
    let pascalCase = columnName[0].toUpperCase();
    for (let i = 1; i < columnName.length; i++) {
        if (columnName[i] >= 'A' && columnName[i] <= 'Z') {
            pascalCase += ' ';
            pascalCase += columnName[i].toLowerCase();
        }
        else {
            pascalCase += columnName[i].toLowerCase();
        }
    }
    return pascalCase;
}
function generateTableHeader(tableHead, data, buttonAppear = false, buttonText = []) {
    const tableRow = document.createElement("tr");
    Object.entries((data[0])).forEach(([key,]) => {
        if (isKeyValidOrNot(key)) {
            const th = document.createElement("th");
            th.setAttribute('scope', 'col');
            th.textContent = convertCamelCaseToPascalCase(key);
            tableRow.appendChild(th);
        }
    });
    if (buttonAppear) {
        for (let i = 0; i < buttonText.length; i++) {
            const th = document.createElement("th");
            th.setAttribute('scope', 'col');
            th.textContent = buttonText[i];
            tableRow.appendChild(th);
        }
    }
    tableHead.appendChild(tableRow);
}
function storeDisableForAdminButtons(disableForAdmin) {
    let map = new Map();
    if (!disableForAdmin.length) {
        return map;
    }
    (disableForAdmin).forEach((element) => map.set(element, 1));
    return map;
}
export function createTable(tableHead, parentNode, data, buttonFunctions, buttonAppear = false, buttonText = [], buttonClasses = [], disableForAdmin) {
    parentNode.innerHTML = "";
    if (!data.length) {
        parentNode.textContent = "No data Available";
        return;
    }
    const storedButtons = storeDisableForAdminButtons(disableForAdmin);
    generateTableHeader(tableHead, data, buttonAppear, buttonText);
    data.forEach((item) => {
        const row = document.createElement("tr");
        Object.entries(item).forEach(([key, value]) => {
            if (isKeyValidOrNot(key)) {
                const cell = document.createElement('td');
                if (isKeyDateOrNot(key)) {
                    cell.textContent = value ? new Date(value).toLocaleString() : 'N/A';
                }
                else {
                    console.log(key, value);
                    cell.textContent = value ?? 'N/A';
                }
                row.appendChild(cell);
            }
        });
        console.log(profileDetails.username, item.username);
        if (buttonAppear) {
            for (let i = 0; i < buttonFunctions.length; i++) {
                const buttonCell = document.createElement('td');
                if (disableForAdmin.length) {
                    if (storedButtons.get(buttonText[i]) && item.username !== profileDetails.username) {
                        const button = createButtons(document.createElement('button'), "", buttonClasses[i], buttonText[i]);
                        button.onclick = () => buttonFunctions[i](item);
                        buttonCell.appendChild(button);
                    }
                }
                else {
                    const button = createButtons(document.createElement('button'), "", buttonClasses[i], buttonText[i]);
                    button.onclick = () => buttonFunctions[i](item);
                    buttonCell.appendChild(button);
                }
                row.appendChild(buttonCell);
            }
        }
        parentNode.appendChild(row);
    });
}
