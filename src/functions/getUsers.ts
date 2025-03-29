import {IUser} from "./interface.js";
import {executeGetApi} from "../ts/apiExecution.js";
import {getAllUsersApi} from "./api.js";

export const users: IUser[] = (await executeGetApi(getAllUsersApi))[1];