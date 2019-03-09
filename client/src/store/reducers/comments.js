import { createSelector } from "reselect";
import * as watchActions from "../actions/watch";

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
	const byVideoMap = {
		nextPageToken: payload.response.nextPageToken,
		ids: [],
	};
	const byIdMap = {};

	comments.forEach(comment => {
		byVideoMap.ids.push(comment.id);
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
