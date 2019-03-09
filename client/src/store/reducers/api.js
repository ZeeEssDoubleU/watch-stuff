import * as apiActions from "../actions/api";

const initialState = {
	libraryLoaded: false,
};

const reducer_api = (state = initialState, action) => {
	switch (action.type) {
		case apiActions.types.YOUTUBE_LIBRARY_LOADED:
			return {
				libraryLoaded: true,
			};
		default:
			return state;
	}
};

export default reducer_api;

// SELECTORS
export const selector_youtubeLibraryLoaded = state => state.api.libraryLoaded;
