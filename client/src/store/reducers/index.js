import { combineReducers } from "redux";
import reducer_api from "./api";
import reducer_videos from "./videos";
import reducer_watch from "./watch";
import reducer_channels from "./channels";
import reducer_comments from "./comments";
import reducer_search from "./search";
import reducer_layout from "./layout";
import reducer_errors from "./errors";

const reducer_root = combineReducers({
	api: reducer_api,
	videos: reducer_videos,
	watch: reducer_watch,
	channels: reducer_channels,
	comments: reducer_comments,
	search: reducer_search,
	layout: reducer_layout,
	errors: reducer_errors,
});
export default reducer_root;
