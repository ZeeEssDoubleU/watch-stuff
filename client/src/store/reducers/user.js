import { createSelector } from "reselect";
// import actions
import * as watchActions from "../actions/watch";
import * as userActions from "../actions/user";

const initialState = {
	libraryLoaded: false,
	history: [],
	saved: {
		order: [],
		cache: {},
	},
	likes: {
		videos: [],
		comments: [],
	},
	dislikes: {
		videos: [],
		comments: [],
	},
};

//***************
// root reducer
//***************

const reducer_user = (state = initialState, action) => {
	switch (action.type) {
		case userActions.types.YOUTUBE_LIBRARY_LOADED:
			return reducer_apiLoaded(action.payload, state);
		case watchActions.types.WATCH_DETAILS_REQUEST:
			return reducer_watchHistory(action.payload, state);
		case watchActions.types.SAVE_VIDEO:
			return reducer_watchLater(action.payload, state);
		default:
			return state;
	}
};
export default reducer_user;

//***************
// sub reducers
//***************

const reducer_apiLoaded = (payload, state) => {
	return {
		...state,
		libraryLoaded: true,
	};
};

const reducer_watchHistory = (payload, state) => {
	const { videoId } = payload;
	const timestamp = Date.now();

	console.log("PAYLOAD - WATCH HISTORY", payload);

	const item = {
		videoId,
		timestamp,
	};
	return {
		...state,
		history: [item, ...state.history],
	};
};

const reducer_watchLater = (payload, state) => {
	const { videoId } = payload;
	let { order } = state.saved;
	const { cache } = state.saved;

	console.log("PAYLOAD - WATCH LATER", payload);

	if (cache[videoId]) {
		order.pop(order.indexOf(`${videoId}`));
		delete cache[videoId];
	} else {
		order = [...order, videoId];
		cache[videoId] = true;
	}

	return {
		...state,
		saved: {
			...state.saved,
			order,
			cache,
		},
	};
};

//***************
// selectors
//***************

export const selector_youtubeLibraryLoaded = createSelector(
	state => state.user.libraryLoaded,
	loaded => loaded,
);

export const selector_watchHistory = createSelector(
	state => state.user.history,
	state => state.videos.byId,
	(historyItems, videos) =>
		historyItems ? historyItems.map(item => videos[item.videoId]) : null,
);

export const selector_savedVideoIdsCache = createSelector(
	state => state.user.saved,
	saved => (saved ? saved.cache : {}),
);
