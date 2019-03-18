import { createSelector } from "reselect";
import * as apiActions from "../actions/api";

const initialState = {
	libraryLoaded: false,
};

//***************
// root reducer
//***************

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

//***************
// sub reducers
//***************

//***************
// selectors
//***************
export const selector_youtubeLibraryLoaded = createSelector(
	state => state.api.libraryLoaded,
	loaded => loaded,
);
