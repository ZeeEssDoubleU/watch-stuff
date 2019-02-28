import { combineReducers } from "redux";
import reducer_api from "./api";
import reducer_videos from "./videos";
import reducer_watch from "./watch";

const reducer_root = combineReducers({
	apiState: reducer_api,
	videosState: reducer_videos,
	watchState: reducer_watch,
});

export default reducer_root;
