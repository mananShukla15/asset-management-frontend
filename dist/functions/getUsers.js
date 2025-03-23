import { executeGetApi } from "../ts/apiExecution";
import { getAllUsersApi } from "./api";
export const users = (await executeGetApi(getAllUsersApi))[1];
