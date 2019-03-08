import { combineReducers } from "redux";
import reducer_api from "./api";
import reducer_videos from "./videos";
import reducer_watch from "./watch";
import reducer_channels from "./channels";
import reducer_errors from "./errors";

const reducer_root = combineReducers({
	apiState: reducer_api,
	videosState: reducer_videos,
	watchState: reducer_watch,
	channelsState: reducer_channels,
	errorsState: reducer_errors,
});

export default reducer_root;
