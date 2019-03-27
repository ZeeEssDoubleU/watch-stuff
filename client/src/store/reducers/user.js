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
	liked: {
		comments: [],
		videos: [],
		cache: {},
	},
	disliked: {
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
	const liked = {
		comments: state.liked.comments || [],
		videos: state.liked.videos || [],
		cache: state.liked.cache || {},
	};
	const disliked = {
		comments: state.disliked.comments || [],
		videos: state.disliked.videos || [],
		cache: state.disliked.cache || {},
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
			liked.cache[item.id]
				? liked.comments.pop(liked.comments.indexOf(item.id))
				: liked.comments.unshift(item);
			if (disliked.cache[item.id]) {
				disliked.comments.pop(disliked.comments.indexOf(item.id));
			}
		}
		// video like button
		if (category === "video") {
			// if already liked or disliked, remove from respective videos
			liked.cache[item.id]
				? liked.videos.pop(liked.videos.indexOf(item.id))
				: liked.videos.unshift(item);
			if (disliked.cache[item.id]) {
				disliked.videos.pop(disliked.videos.indexOf(item.id));
			}
		}
		// cache stores all liked
		// if already liked or disliked, delete from respective cache
		liked.cache[item.id]
			? delete liked.cache[item.id]
			: (liked.cache[item.id] = item);
		if (disliked.cache[item.id]) {
			delete disliked.cache[item.id];
		}
	}

	// dislike button pressed
	if (vote === "dislike") {
		// comment dislike button
		if (category === "comment") {
			// if already disliked or liked, remove from respective comments
			disliked.cache[item.id]
				? disliked.comments.pop(disliked.comments.indexOf(item.id))
				: disliked.comments.unshift(item);
			if (liked.cache[item.id]) {
				liked.comments.pop(liked.comments.indexOf(item.id));
			}
		}
		// video dislike button
		if (category === "video") {
			// if already disliked or liked, remove from respective videos
			disliked.cache[item.id]
				? disliked.videos.pop(disliked.videos.indexOf(item.id))
				: disliked.videos.unshift(item);
			if (liked.cache[item.id]) {
				liked.videos.pop(liked.videos.indexOf(item.id));
			}
		}
		// cache stores all disliked
		// if already disliked or liked, delete from respective cache
		disliked.cache[item.id]
			? delete disliked.cache[item.id]
			: (disliked.cache[item.id] = item);
		if (liked.cache[item.id]) {
			delete liked.cache[item.id];
		}
	}

	return {
		...state,
		liked,
		disliked,
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

export const selector_likedVideos = createSelector(
	state => state.user.liked.videos,
	state => state.videos.byId,
	(likedVids, videos) =>
		likedVids ? likedVids.map(item => videos[item.id]) : null,
);

export const selector_likedIdsCache = createSelector(
	state => state.user.liked,
	liked => (liked ? liked.cache : {}),
);
export const selector_dislikedIdsCache = createSelector(
	state => state.user.disliked,
	disliked => (disliked ? disliked.cache : {}),
);
