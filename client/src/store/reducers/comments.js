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
	const byVideoMap = {};
	const byIdMap = {};

	byVideoMap[videoId] = {
		nextPageToken: payload.response.nextPageToken,
		ids: [],
	};

	comments.forEach(comment => {
		byVideoMap[videoId].ids.push(comment.id);
		byIdMap[comment.id] = comment;
	});

	console.log("PAYLOAD - COMMENTS", payload);

	return {
		...state,
		byVideo: {
			...state.byVideo,
			...byVideoMap,
		},
		byId: {
			...state.byIds,
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
	(commentsList, comments) => {
		if (commentsList) {
			return commentsList.ids.map(id => comments[id]);
		}
		return null;
	},
);

export const selector_commentsCount = createSelector(
	selector_videoById,
	video => {
		if (video) {
			return video.statistics.commentCount;
		}
		return null;
	},
);

export const selector_commentNextPageToken = createSelector(
	(state, videoId) => state.comments.byVideo[videoId],
	comment => {
		return comment ? comment.nextPageToken : null;
	},
);

export const selector_commentsLoaded = createSelector(
	selector_commentsByVideo,
	comments => Object.keys(comments).length > 0,
);