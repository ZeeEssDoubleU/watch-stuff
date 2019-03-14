import { createSelector } from "reselect";
import * as watchActions from "../actions/watch";
import { selector_videoById } from "../reducers/videos";

const initialState = {
	byVideo: {},
	byId: {},
};

//***************
// COMMENTS REDUCERS
//***************

const reducer_comments = (state = initialState, action) => {
	switch (action.type) {
		case watchActions.types.COMMENTS_SUCCESS:
			return reducer_fetchComments(action.payload, state);
		default:
			return state;
	}
};

export default reducer_comments;

const reducer_fetchComments = (payload, state) => {
	const comments = payload.response.items;
	const videoId = payload.videoId;
	// if data exists, grabs prev comment ids from comment byVideo.ids array
	const prevIds = state.byVideo[videoId] ? state.byVideo[videoId].ids : [];
	const newIds = comments.map(comment => comment.id);
	// initialize comment byVideo and byId maps
	const byIdMap = {};

	// for each comment, push comment.id into byVideoMap ids array
	// for each comment, add comment to byIdMap object
	comments.forEach(comment => (byIdMap[comment.id] = comment));

	const byVideoMap = {
		nextPageToken: payload.response.nextPageToken,
		ids: Array.from(new Set([...prevIds, ...newIds])), // sets byVideoMap ids to previous state's ids
	};

	console.log("PAYLOAD - COMMENTS", payload);
	console.log("COMMENTS BY ID", byIdMap);
	console.log("COMMENTS BY VIDEO", byVideoMap);

	return {
		...state,
		byVideo: {
			...state.byVideo,
			[videoId]: byVideoMap,
		},
		byId: {
			...state.byId,
			...byIdMap,
		},
	};
};

//***************
// SELECTORS
//***************
export const selector_commentsByVideo = createSelector(
	(state, videoId) => state.comments.byVideo[videoId],
	state => state.comments.byId,
	(commentsList, comments) =>
		commentsList ? commentsList.ids.map(id => comments[id]) : null,
);

export const selector_commentsCount = createSelector(
	selector_videoById,
	video => (video ? video.statistics.commentCount : null),
);

export const selector_commentsNextPageToken = createSelector(
	(state, videoId) => state.comments.byVideo[videoId],
	comment => (comment ? comment.nextPageToken : null),
);

export const selector_commentsLoaded = createSelector(
	selector_commentsByVideo,
	comments => (comments ? comments.length > 0 : false),
);
