// video action types
export const MOST_POPULAR_REQUEST = "MOST_POPULAR_REQUEST";
export const MOST_POPULAR_SUCCESS = "MOST_POPULAR_SUCCESS";
export const MOST_POPULAR_FAILURE = "MOST_POPULAR_FAILURE";

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
