import { createSelector } from "reselect";
// import actions
import * as watchActions from "../actions/watch";
import * as userActions from "../actions/user";

const initialState = {
	youtubeLibraryLoaded: false,
};

//***************
// root reducer
//***************

const reducer_session = (state = initialState, action) => {
	switch (action.type) {
		case userActions.types.YOUTUBE_LIBRARY_LOADED:
			return reducer_apiLoaded(action.payload, state);
		default:
			return state;
	}
};
export default reducer_session;

//***************
// sub reducers
//***************

const reducer_apiLoaded = (payload, state) => {
	return {
      ...state,
		libraryLoaded: true,
	};
};
export const selector_youtubeLibraryLoaded = createSelector(
	state => state.session.libraryLoaded,
	loaded => loaded,
);
