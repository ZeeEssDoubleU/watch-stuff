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
	const prevIds = state.results || [];
	const newIds = response.items.map(item => item.id.videoId) || [];

	// console.log("PAYLOAD - FETCH SEARCH VIDEOS (SEARCH)", payload);

	return {
		query,
		totalResults: response.pageInfo.totalResults,
		nextPageToken: response.nextPageToken,
		results: Array.from(new Set([...prevIds, ...newIds])),
	};
};

//***************
// selectors
//***************

export const selector_searchResultsLoaded = createSelector(
	state => state.search.results,
	state => state.videos.byId,
	(searchIds, videosById) =>
		searchIds ? searchIds.every(id => id in videosById) : false,
);
export const selector_searchNPT = createSelector(
	state => state.search,
	search => search.nextPageToken,
);
export const selector_searchResults = createSelector(
	state => state.search.results,
	state => state.videos.byId,
	(searchIds, videos) => (searchIds ? searchIds.map(id => videos[id]) : null),
);
