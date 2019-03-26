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
		comments: [],
		videos: [],
		cache: {},
	},
	dislikes: {
		comments: [],
		videos: [],
		cache: {},
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
		case userActions.types.VOTE_LIKE:
		case userActions.types.VOTE_DISLIKE:
			return reducer_vote(action.payload, state);
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
	const timestamp = Date.now();
	let { order } = state.saved;
	const { cache } = state.saved;

	console.log("PAYLOAD - WATCH LATER", payload);

	const item = {
		videoId,
		timestamp,
	};

	if (cache[videoId]) {
		order.pop(order.indexOf(item.videoId));
		delete cache[videoId];
	} else {
		order.push(item);
		cache[videoId] = item;
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

const reducer_vote = (payload, state) => {
	const { vote, category, id } = payload;
	const timestamp = Date.now();
	const likes = {
		comments: state.likes.comments || [],
		videos: state.likes.videos || [],
		cache: state.likes.cache || {},
	};
	const dislikes = {
		comments: state.dislikes.comments || [],
		videos: state.dislikes.videos || [],
		cache: state.dislikes.cache || {},
	};

	const item = {
		vote,
		category,
		id,
		timestamp,
	};

	// like button pressed
	if (vote === "like") {
		// comment like button
		if (category === "comment") {
			// if already liked or disliked, remove from respective comments
			likes.cache[item.id]
				? likes.comments.pop(likes.comments.indexOf(item.id))
				: likes.comments.unshift(item);
			if (dislikes.cache[item.id]) {
				dislikes.comments.pop(dislikes.comments.indexOf(item.id));
			}
		}
		// video like button
		if (category === "video") {
			// if already liked or disliked, remove from respective videos
			likes.cache[item.id]
				? likes.videos.pop(likes.videos.indexOf(item.id))
				: likes.videos.unshift(item);
			if (dislikes.cache[item.id]) {
				dislikes.videos.pop(dislikes.videos.indexOf(item.id));
			}
		}
		// cache stores all likes
		// if already liked or disliked, delete from respective cache
		likes.cache[item.id]
			? delete likes.cache[item.id]
			: (likes.cache[item.id] = item);
		if (dislikes.cache[item.id]) {
			delete dislikes.cache[item.id];
		}
	}

	// dislike button pressed
	if (vote === "dislike") {
		// comment dislike button
		if (category === "comment") {
			// if already disliked or liked, remove from respective comments
			dislikes.cache[item.id]
				? dislikes.comments.pop(dislikes.comments.indexOf(item.id))
				: dislikes.comments.unshift(item);
			if (likes.cache[item.id]) {
				likes.comments.pop(likes.comments.indexOf(item.id));
			}
		}
		// video dislike button
		if (category === "video") {
			// if already disliked or liked, remove from respective videos
			dislikes.cache[item.id]
				? dislikes.videos.pop(dislikes.videos.indexOf(item.id))
				: dislikes.videos.unshift(item);
			if (likes.cache[item.id]) {
				likes.videos.pop(likes.videos.indexOf(item.id));
			}
		}
		// cache stores all dislikes
		// if already disliked or liked, delete from respective cache
		dislikes.cache[item.id]
			? delete dislikes.cache[item.id]
			: (dislikes.cache[item.id] = item);
		if (likes.cache[item.id]) {
			delete likes.cache[item.id];
		}
	}

	return {
		...state,
		likes,
		dislikes,
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

export const selector_savedVideos = createSelector(
	state => state.user.saved.order,
	state => state.videos.byId,
	(savedItems, videos) =>
		savedItems ? savedItems.map(item => videos[item.videoId]) : null,
);

export const selector_savedVideoIdsCache = createSelector(
	state => state.user.saved,
	saved => (saved ? saved.cache : {}),
);
