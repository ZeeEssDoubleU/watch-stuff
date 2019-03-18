import { createSelector } from "reselect";
import * as searchActions from "../actions/search";

const initialState = {};

//***************
// reducers
//***************

const reducer_search = (state = initialState, action) => {
	switch (action.type) {
		case searchActions.types.SEARCH_VIDEOS_SUCCESS:
			return reducer_fetchSearchVideos(action.payload, state);
		default:
			return state;
	}
};
export default reducer_search;

const reducer_fetchSearchVideos = (payload, state) => {
	const { response, searchQuery } = payload;
	const prevResults = state.results || [];
	const newResults = response.items || [];
	console.log("PAYLOAD - SEARCH VIDEOS", payload);
	console.log("PAYLOAD - PREV RESULTS", prevResults);
	console.log("PAYLOAD - NEW RESULTS", newResults);

	return {
		...state,
		query: searchQuery,
		totalResults: response.pageInfo.totalResults,
		nextPageToken: response.nextPageToken,
		results: Array.from(new Set([...prevResults, ...newResults])),
	};
};

//***************
// selectors
//***************
