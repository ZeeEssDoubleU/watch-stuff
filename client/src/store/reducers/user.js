import { createSelector } from "reselect";
// import actions
import * as watchActions from "../actions/watch";
import * as userActions from "../actions/user";

const initialState = {
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
	subscriptions: {},
};

//***************
// root reducer
//***************

const reducer_user = (state = initialState, action) => {
	switch (action.type) {
		case watchActions.types.UPDATE_WATCH_HISTORY:
			return reducer_watchHistory(action.payload, state);
		case watchActions.types.SAVE_VIDEO:
			return reducer_saveVideo(action.payload, state);
		case watchActions.types.SUBSCRIBE:
			return reducer_subscribe(action.payload, state);
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

const reducer_watchHistory = (payload, state) => {
	const { videoId } = payload;
	const timestamp = Date.now();

	// console.log("PAYLOAD - WATCH HISTORY", payload);

	const item = {
		videoId,
		timestamp,
	};
	return {
		...state,
		history: [item, ...state.history],
	};
};

const reducer_saveVideo = (payload, state) => {
	const { videoId } = payload;
	const timestamp = Date.now();
	let newOrder = [...state.saved.order];
	const newCache = { ...state.saved.cache };

	// console.log("PAYLOAD - WATCH LATER", payload);

	const item = {
		videoId,
		timestamp,
	};

	if (newCache[videoId]) {
		newOrder.pop(newOrder.indexOf(item.videoId));
		delete newCache[videoId];
	} else {
		newOrder.push(item);
		newCache[videoId] = item;
	}

	return {
		...state,
		saved: {
			...state.saved,
			order: newOrder,
			cache: newCache,
		},
	};
};

// TODO - Add data fetching for subscriptions and load them dynamically to SideNav
const reducer_subscribe = (payload, state) => {
	const newSubs = { ...state.subscriptions };
	const { channelId, channelTitle, channelIcon } = payload;
	const item = {
		channelId,
		channelTitle,
		channelIcon,
	};

	// console.log("PAYLOAD - SUBSCRIBE", payload);

	newSubs[channelId] ? delete newSubs[channelId] : (newSubs[channelId] = item);

	return {
		...state,
		subscriptions: newSubs,
	};
};

const reducer_vote = (payload, state) => {
	const { vote, category, id } = payload;
	const timestamp = Date.now();
	const liked = {
		comments: [...state.liked.comments],
		videos: [...state.liked.videos],
		cache: { ...state.liked.cache },
	};
	const disliked = {
		comments: [...state.disliked.comments],
		videos: [...state.disliked.videos],
		cache: { ...state.disliked.cache },
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
				: // add to liked if not liked
				  liked.comments.unshift(item);
			if (disliked.cache[item.id]) {
				disliked.comments.pop(disliked.comments.indexOf(item.id));
			}
		}
		// video like button
		if (category === "video") {
			// if already liked or disliked, remove from respective videos
			liked.cache[item.id]
				? liked.videos.pop(liked.videos.indexOf(item.id))
				: // add to liked if not liked
				  liked.videos.unshift(item);
			if (disliked.cache[item.id]) {
				disliked.videos.pop(disliked.videos.indexOf(item.id));
			}
		}
		// cache stores all liked
		// if already liked or disliked, delete from respective cache
		liked.cache[item.id]
			? delete liked.cache[item.id]
			: // add to liked cache if not liked
			  (liked.cache[item.id] = item);
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
				: // add to disliked if not disliked
				  disliked.comments.unshift(item);
			if (liked.cache[item.id]) {
				liked.comments.pop(liked.comments.indexOf(item.id));
			}
		}
		// video dislike button
		if (category === "video") {
			// if already disliked or liked, remove from respective videos
			disliked.cache[item.id]
				? disliked.videos.pop(disliked.videos.indexOf(item.id))
				: // add to disliked if not disliked
				  disliked.videos.unshift(item);
			if (liked.cache[item.id]) {
				liked.videos.pop(liked.videos.indexOf(item.id));
			}
		}
		// cache stores all disliked
		// if already disliked or liked, delete from respective cache
		disliked.cache[item.id]
			? delete disliked.cache[item.id]
			: // add to disliked cache if not disliked
			  (disliked.cache[item.id] = item);
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
export const selector_watchHistoryIds = createSelector(
	state => state.user.history,
	history => history,
);

export const selector_watchHistoryLoaded = createSelector(
	selector_watchHistoryIds,
	state => state.videos.byId,
	(history, videosById) => history.every(item => item.videoId in videosById),
);

export const selector_watchHistoryVideos = createSelector(
	state => state.user.history,
	state => state.videos.byId,
	(historyItems, videos) => historyItems.map(item => videos[item.videoId]),
);

export const selector_savedVideoIds = createSelector(
	state => state.user.saved,
	saved => (saved ? saved.order : null),
);

export const selector_savedVideosLoaded = createSelector(
	selector_savedVideoIds,
	state => state.videos.byId,
	(savedItems, videosById) =>
		savedItems.every(item => item.videoId in videosById),
);

export const selector_savedVideos = createSelector(
	state => state.user.saved.order,
	state => state.videos.byId,
	(savedItems, videos) => savedItems.map(item => videos[item.videoId]),
);

export const selector_savedVideoIdsCache = createSelector(
	state => state.user.saved,
	saved => (saved ? saved.cache : {}),
);

export const selector_likedVideoIds = createSelector(
	state => state.user.liked.videos,
	likedVids => likedVids,
);

export const selector_likedVideosLoaded = createSelector(
	selector_savedVideoIds,
	state => state.videos.byId,
	(likedVids, videosById) =>
		likedVids.every(item => item.videoId in videosById),
);

export const selector_likedVideos = createSelector(
	state => state.user.liked.videos,
	state => state.videos.byId,
	(likedVids, videos) => likedVids.map(item => videos[item.id]),
);

export const selector_likedIdsCache = createSelector(
	state => state.user.liked,
	liked => (liked ? liked.cache : {}),
);
export const selector_dislikedIdsCache = createSelector(
	state => state.user.disliked,
	disliked => (disliked ? disliked.cache : {}),
);

export const selector_subscriptions = createSelector(
	state => state.user.subscriptions,
	subscriptions => subscriptions,
);
