import { executeGetApi } from "../ts/apiExecution";
import { getProfileApi } from "./api";
export const profileDetails = (await executeGetApi(getProfileApi))[1];
