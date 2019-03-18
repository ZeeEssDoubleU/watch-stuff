// video action types
export const types = {
	SEARCH_VIDEOS_REQUEST: "SEARCH_VIDEOS_REQUEST",
	SEARCH_VIDEOS_SUCCESS: "SEARCH_VIDEOS_SUCCESS",
	SEARCH_VIDEOS_FAILURE: "SEARCH_VIDEOS_FAILURE",
	SEARCH_VIDEOS_DETAILS_REQUEST: "SEARCH_VIDEOS_DETAILS_REQUEST",
	SEARCH_VIDEOS_DETAILS_SUCCESS: "SEARCH_VIDEOS_DETAILS_SUCCESS",
	SEARCH_VIDEOS_DETAILS_FAILURE: "SEARCH_VIDEOS_DETAILS_FAILURE",
};

export const action_fetchSearchVideos = {
	request: (searchQuery, nextPageToken, amount) => ({
		type: types.SEARCH_VIDEOS_REQUEST,
		payload: {
			searchQuery,
			nextPageToken,
			amount,
		},
	}),
	success: (response, searchQuery) => ({
		type: types.SEARCH_VIDEOS_SUCCESS,
		payload: {
			response,
			searchQuery,
		},
	}),
	failure: (response, searchQuery) => ({
		type: types.SEARCH_VIDEOS_FAILURE,
		payload: {
			response,
			searchQuery,
		},
	}),
};

export const action_fetchSearchVideosDetails = {
	request: searchQuery => ({
		type: types.SEARCH_VIDEOS_DETAILS_REQUEST,
		payload: { searchQuery },
	}),
	success: response => ({
		type: types.SEARCH_VIDEOS_DETAILS_SUCCESS,
		payload: response,
	}),
	failure: response => ({
		type: types.SEARCH_VIDEOS_DETAILS_FAILURE,
		payload: response,
	}),
};
