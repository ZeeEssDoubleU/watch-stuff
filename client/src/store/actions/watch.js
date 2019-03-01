// video action types
export const types = {
	WATCH_DETAILS_REQUEST: "WATCH_DETAILS_REQUEST",
	WATCH_DETAILS_SUCCESS: "WATCH_DETAILS_SUCCESS",
	WATCH_DETAILS_FAILURE: "WATCH_DETAILS_FAILURE",
};

export const action_fetchWatchDetails = {
	request: videoId => ({
		type: types.WATCH_DETAILS_REQUEST,
		payload: { videoId },
	}),
	success: response => ({
		type: types.WATCH_DETAILS_SUCCESS,
		payload: response,
	}),
	failure: response => ({
		type: types.WATCH_DETAILS_FAILURE,
		payload: response,
	}),
};
