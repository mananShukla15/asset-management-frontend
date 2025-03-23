"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headers = exports.assetUpdateStatusApi = exports.assetPendingApi = exports.assetRequestApi = exports.deleteAssetApi = exports.updateAssetApi = exports.assetUnassignApi = exports.assetAssignApi = exports.assetHistoryApi = exports.createAssetApi = exports.getAllAssetsApi = exports.deleteUserApi = exports.createUserViaAdminApi = exports.getRolesApi = exports.getProfileApi = exports.getAllUsersApi = exports.resetPasswordApi = exports.forgetPasswordApi = exports.signupApi = exports.loginApi = exports.verifyUserViaOtpApi = void 0;
var api = "http://localhost:5001/";
var userApi = api + "users/";
var assetApi = api + "assets/";
exports.verifyUserViaOtpApi = userApi + "verify/";
exports.loginApi = userApi + "login/";
exports.signupApi = userApi + "signup/";
exports.forgetPasswordApi = userApi + "password/forget";
exports.resetPasswordApi = userApi + "password/reset";
exports.getAllUsersApi = userApi;
exports.getProfileApi = userApi + "profile/";
exports.getRolesApi = userApi + "roles/";
exports.createUserViaAdminApi = userApi;
exports.deleteUserApi = userApi;
exports.getAllAssetsApi = assetApi;
exports.createAssetApi = assetApi;
exports.assetHistoryApi = assetApi + "history/";
exports.assetAssignApi = assetApi + "assign/";
exports.assetUnassignApi = assetApi + "unassign/";
exports.updateAssetApi = assetApi;
exports.deleteAssetApi = assetApi;
exports.assetRequestApi = assetApi + "request/";
exports.assetPendingApi = assetApi + "request/pending/";
exports.assetUpdateStatusApi = assetApi + "request/status/";
exports.headers = {
    'Authorization': "".concat(localStorage.getItem('token')),
    'Content-Type': 'application/json'
};
