import { createSelector } from "reselect";
// import actions
import * as searchActions from "../actions/search";

const initialState = {
	query: null,
	totalResults: null,
	nextPageToken: null,
	results: [],
};

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
	const prevQuery = state.query;
	const prevIds = state.results || [];
	const newIds = response.items.map(item => item.id.videoId) || [];

	console.log("PAYLOAD - FETCH SEARCH VIDEOS (SEARCH)", payload);

	const results =
		prevQuery === query
			? Array.from(new Set([...prevIds, ...newIds]))
			: newIds;

	return {
		query,
		totalResults: response.pageInfo.totalResults,
		nextPageToken: response.nextPageToken,
		results,
	};
};

//***************
// selectors
//***************

export const selector_searchResultsLoaded = createSelector(
	state => state.search.results,
	state => state.videos.byId,
	(searchIds, videosById) => searchIds.every(id => id in videosById),
);
export const selector_searchNPT = createSelector(
	state => state.search,
	search => search.nextPageToken,
);
export const selector_searchResults = createSelector(
	state => state.search.results,
	state => state.videos.byId,
	(searchIds, videos) => searchIds.map(id => videos[id]),
);
