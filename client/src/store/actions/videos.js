// video action types
export const MOST_POPULAR_REQUEST = "MOST_POPULAR_REQUEST";
export const MOST_POPULAR_SUCCESS = "MOST_POPULAR_SUCCESS";
export const MOST_POPULAR_FAILURE = "MOST_POPULAR_FAILURE";
export const VIDEO_CATEGORIES_REQUEST = "VIDEO_CATEGORIES_REQUEST";
export const VIDEO_CATEGORIES_SUCCESS = "VIDEO_CATEGORIES_SUCCESS";
export const VIDEO_CATEGORIES_FAILURE = "VIDEO_CATEGORIES_FAILURE";

export const fetchMostPopularVideos = {
	request: (amount, loadDescription, nextPageToken) => ({
		type: MOST_POPULAR_REQUEST,
		payload: {
			amount,
			loadDescription,
			nextPageToken,
		},
	}),
	success: response => ({
		type: MOST_POPULAR_SUCCESS,
		payload: response,
	}),
	failure: response => ({
		type: MOST_POPULAR_FAILURE,
		payload: response,
	}),
};
export const fetchVideoCategories = {
	request: () => ({
		type: VIDEO_CATEGORIES_REQUEST,
		payload: {},
	}),
	success: response => ({
		type: VIDEO_CATEGORIES_SUCCESS,
		payload: response,
	}),
	failure: response => ({
		type: VIDEO_CATEGORIES_FAILURE,
		payload: response,
	}),
};
