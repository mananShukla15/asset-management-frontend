import {executeGetApi} from "../ts/apiExecution.js";
import {getProfileApi} from "./api.js";

export const profileDetails  = (await executeGetApi(getProfileApi))[1];