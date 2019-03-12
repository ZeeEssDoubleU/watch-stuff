// video action types
export const types = {
	WATCH_DETAILS_REQUEST: "WATCH_DETAILS_REQUEST",
	WATCH_DETAILS_SUCCESS: "WATCH_DETAILS_SUCCESS",
	WATCH_DETAILS_FAILURE: "WATCH_DETAILS_FAILURE",
	RELATED_VIDEOS_REQUEST: "RELATED_VIDEOS_REQUEST",
	RELATED_VIDEOS_SUCCESS: "RELATED_VIDEOS_SUCCESS",
	RELATED_VIDEOS_FAILURE: "RELATED_VIDEOS_FAILURE",
	RELATED_VIDEO_DETAILS_REQUEST: "RELATED_VIDEO_DETAILS_REQUEST",
	RELATED_VIDEO_DETAILS_SUCCESS: "RELATED_VIDEO_DETAILS_SUCCESS",
	RELATED_VIDEO_DETAILS_FAILURE: "RELATED_VIDEO_DETAILS_FAILURE",
	CHANNEL_DETAILS_REQUEST: "CHANNEL_DETAILS_REQUEST",
	CHANNEL_DETAILS_SUCCESS: "CHANNEL_DETAILS_SUCCESS",
	CHANNEL_DETAILS_FAILURE: "CHANNEL_DETAILS_FAILURE",
	COMMENTS_REQUEST: "COMMENTS_REQUEST",
	COMMENTS_SUCCESS: "COMMENTS_SUCCESS",
	COMMENTS_FAILURE: "COMMENTS_FAILURE",
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

export const action_fetchRelatedVideos = {
	request: (videoId, amount) => ({
		type: types.RELATED_VIDEOS_REQUEST,
		payload: {
			videoId,
			amount,
		},
	}),
	success: (response, videoId) => ({
		type: types.RELATED_VIDEOS_SUCCESS,
		payload: {
			response,
			videoId,
		},
	}),
	failure: response => ({
		type: types.RELATED_VIDEOS_FAILURE,
		payload: response,
	}),
};

export const action_fetchRelatedVideoDetails = {
	request: videoIds => ({
		type: types.RELATED_VIDEO_DETAILS_REQUEST,
		payload: { videoIds },
	}),
	success: response => ({
		type: types.RELATED_VIDEO_DETAILS_SUCCESS,
		payload: response,
	}),
	failure: response => ({
		type: types.RELATED_VIDEO_DETAILS_FAILURE,
		payload: response,
	}),
};

export const action_fetchChannelDetails = {
	request: channelId => ({
		type: types.CHANNEL_DETAILS_REQUEST,
		payload: { channelId },
	}),
	success: response => ({
		type: types.CHANNEL_DETAILS_SUCCESS,
		payload: response,
	}),
	failure: response => ({
		type: types.CHANNEL_DETAILS_FAILURE,
		payload: response,
	}),
};

export const action_fetchComments = {
	request: (videoId, nextPageToken) => ({
		type: types.COMMENTS_REQUEST,
		payload: {
			videoId,
			nextPageToken,
		},
	}),
	success: (response, videoId) => ({
		type: types.COMMENTS_SUCCESS,
		payload: {
			response,
			videoId,
		},
	}),
	failure: response => ({
		type: types.COMMENTS_FAILURE,
		payload: response,
	}),
};
