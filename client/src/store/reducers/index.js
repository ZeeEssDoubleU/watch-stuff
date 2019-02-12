import { combineReducers } from "redux";
import apiReducer from "./api";
import videosReducer from "./videos";

const rootReducer = combineReducers({
	apiState: apiReducer,
	videosState: videosReducer,
});

export default rootReducer;
