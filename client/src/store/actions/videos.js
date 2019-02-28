// video action types
export const types = {
	MOST_POPULAR_REQUEST: "MOST_POPULAR_REQUEST",
	MOST_POPULAR_SUCCESS: "MOST_POPULAR_SUCCESS",
	MOST_POPULAR_FAILURE: "MOST_POPULAR_FAILURE",
	VIDEO_CATEGORIES_REQUEST: "VIDEO_CATEGORIES_REQUEST",
	VIDEO_CATEGORIES_SUCCESS: "VIDEO_CATEGORIES_SUCCESS",
	VIDEO_CATEGORIES_FAILURE: "VIDEO_CATEGORIES_FAILURE",
	MOST_POPULAR_BY_CATEGORY_REQUEST: "MOST_POPULAR_BY_CATEGORY_REQUEST",
	MOST_POPULAR_BY_CATEGORY_SUCCESS: "MOST_POPULAR_BY_CATEGORY_SUCCESS",
	MOST_POPULAR_BY_CATEGORY_FAILURE: "MOST_POPULAR_BY_CATEGORY_FAILURE",
	WATCH_DETAILS_REQUEST: "WATCH_DETAILS_REQUEST",
	WATCH_DETAILS_SUCCESS: "WATCH_DETAILS_SUCCESS",
	WATCH_DETAILS_FAILURE: "WATCH_DETAILS_FAILURE",
};

export const action_fetchMostPopular = {
	request: (amount, loadDescription, nextPageToken) => ({
		type: types.MOST_POPULAR_REQUEST,
		payload: {
			amount,
			loadDescription,
			nextPageToken,
		},
	}),
	success: response => ({
		type: types.MOST_POPULAR_SUCCESS,
		payload: response,
	}),
	failure: response => ({
		type: types.MOST_POPULAR_FAILURE,
		payload: response,
	}),
};

export const action_fetchCategory = {
	request: () => ({
		type: types.VIDEO_CATEGORIES_REQUEST,
		payload: {},
	}),
	success: response => ({
		type: types.VIDEO_CATEGORIES_SUCCESS,
		payload: response,
	}),
	failure: response => ({
		type: types.VIDEO_CATEGORIES_FAILURE,
		payload: response,
	}),
};

export const action_fetchMostPopularByCategory = {
	request: categories => ({
		type: types.MOST_POPULAR_BY_CATEGORY_REQUEST,
		payload: { categories },
	}),
	success: (response, categories) => ({
		type: types.MOST_POPULAR_BY_CATEGORY_SUCCESS,
		payload: {
			response,
			categories,
		},
	}),
	failure: response => ({
		type: types.MOST_POPULAR_BY_CATEGORY_FAILURE,
		payload: response,
	}),
};

export const action_fetchWatchDetails = {
	request: videoId => ({
		type: types.WATCH_DETAILS_REQUEST,
		payload: { videoId },
	}),
	success: response => ({
		type: types.WATCH_DETAILS_SUCCESS,
		payload: {
			response,
		},
	}),
	failure: response => ({
		type: types.WATCH_DETAILS_FAILURE,
		payload: response,
	}),
};
