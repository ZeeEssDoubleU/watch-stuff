import { createSelector } from "reselect";
import * as searchActions from "../actions/search";

const initialState = {};

//***************
// root reducer
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

//***************
// sub reducers
//***************

const reducer_fetchSearchVideos = (payload, state) => {
	const { response, query } = payload;
	const prevResults = state.results || [];
	const newResults = response.items || [];
	console.log("PAYLOAD - FETCH SEARCH VIDEOS (SEARCH)", payload);
	console.log("PAYLOAD - PREV RESULTS", prevResults);
	console.log("PAYLOAD - NEW RESULTS", newResults);

	return {
		query,
		totalResults: response.pageInfo.totalResults,
		nextPageToken: response.nextPageToken,
		results: Array.from(new Set([...prevResults, ...newResults])),
	};
};

//***************
// selectors
//***************

export const selector_getSearchResults = createSelector(
	state => state.search,
	search => search.results,
);
export const getSearchNextPageToken = createSelector(
	state => state.search,
	search => search.nextPageToken,
);
