import { YOUTUBE_LIBRARY_LOADED } from "../actions/api";

const initialState = {
	libraryLoaded: false,
};

// REDUCERS
const apiReducer = (state = initialState, action) => {
	switch (action.type) {
		case YOUTUBE_LIBRARY_LOADED:
			return {
				libraryLoaded: true,
			};
		default:
			return state;
	}
};

export default apiReducer;

// SELECTORS
export const getYoutubeLibraryLoaded = state => state.apiState.libraryLoaded;
