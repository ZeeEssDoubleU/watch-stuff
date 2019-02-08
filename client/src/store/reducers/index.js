import apiReducer from "./api";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	apiState: apiReducer,
});

export default rootReducer;
