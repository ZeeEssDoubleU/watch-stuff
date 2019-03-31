import { createSelector } from "reselect";
// import actions
import * as userActions from "../actions/user";
import * as videosActions from "../actions/videos";
import * as searchActions from "../actions/search";

const initialState = {
	youtubeLibraryLoaded: false,
	listLoaded: false,
};

//***************
// root reducer
//***************

const reducer_session = (state = initialState, action) => {
	switch (action.type) {
		case userActions.types.YOUTUBE_LIBRARY_LOADED:
			return reducer_apiLoaded(state);
		case videosActions.types.MOST_POPULAR_REQUEST:
		case searchActions.types.SEARCH_VIDEOS_REQUEST:
			return reducer_listNotLoaded(state);
		case videosActions.types.MOST_POPULAR_SUCCESS:
		case searchActions.types.SEARCH_VIDEOS_SUCCESS:
			return reducer_listLoaded(state);
		default:
			return state;
	}
};
export default reducer_session;

//***************
// sub reducers
//***************

const reducer_apiLoaded = state => {
	return {
		...state,
		libraryLoaded: true,
	};
};

const reducer_listLoaded = state => {
	return {
		...state,
		listLoaded: true,
	};
};

const reducer_listNotLoaded = state => {
	return {
		...state,
		listLoaded: false,
	};
};

//***************
// selectors
//***************
export const selector_youtubeLibraryLoaded = createSelector(
	state => state.session.libraryLoaded,
	loaded => loaded,
);

export const selector_listLoaded = createSelector(
	state => state.session.listLoaded,
	loaded => loaded,
);
