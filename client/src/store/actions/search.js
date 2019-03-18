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
	request: (query, nextPageToken, amount) => ({
		type: types.SEARCH_VIDEOS_REQUEST,
		payload: {
			query,
			nextPageToken,
			amount,
		},
	}),
	success: (response, query) => ({
		type: types.SEARCH_VIDEOS_SUCCESS,
		payload: {
			response,
			query,
		},
	}),
	failure: (response, query) => ({
		type: types.SEARCH_VIDEOS_FAILURE,
		payload: {
			response,
			query,
		},
	}),
};

export const action_fetchSearchVideosDetails = {
	request: videoIds => ({
		type: types.SEARCH_VIDEOS_DETAILS_REQUEST,
		payload: { videoIds },
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
