import { combineReducers } from "redux";
import reducer_api from "./api";
import reducer_videos from "./videos";

const reducer_root = combineReducers({
	apiState: reducer_api,
	videosState: reducer_videos,
});

export default reducer_root;
