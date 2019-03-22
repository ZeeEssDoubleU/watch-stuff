import { createSelector } from "reselect";
import * as watchActions from "../actions/watch";

const initialState = {
	details: {},
	relatedVideos: {},
	history: [],
};

//***************
// root reducer
//***************

const reducer_watch = (state = initialState, action) => {
	switch (action.type) {
		case watchActions.types.WATCH_DETAILS_REQUEST:
			return reducer_updateWatchHistory(action.payload, state);
		case watchActions.types.WATCH_DETAILS_SUCCESS:
			return reducer_fetchWatchDetails(action.payload, state);
		case watchActions.types.RELATED_VIDEOS_SUCCESS:
			return reducer_fetchRelatedVideos(action.payload, state);
		default:
			return state;
	}
};
export default reducer_watch;

//***************
// sub reducers
//***************

const reducer_updateWatchHistory = (payload, state) => {
	const { videoId } = payload;
	const timestamp = Date.now();
	const item = {
		videoId,
		timestamp,
	};
	return {
		...state,
		history: [item, ...state.history],
	};
};

const reducer_fetchWatchDetails = (payload, state) => {
	const details = payload.items[0];

	return {
		...state,
		details,
	};
};

const reducer_fetchRelatedVideos = (payload, state) => {
	const { response } = payload;
	const prevIds = state.relatedVideos.videoIds || [];
	const newIds = response.items.map(item => item.id.videoId) || [];
	const prevWatchId = state.relatedVideos.videoId;
	const newWatchId = payload.videoId;

	// console.log("PAYLOAD - FETCH RELATED VIDEOS", payload);

	const videoIds =
		prevWatchId === newWatchId
			? Array.from(new Set([...prevIds, ...newIds]))
			: newIds;

	const relatedVideos = {
		videoId: newWatchId,
		totalResults: payload.response.pageInfo.totalResults,
		nextPageToken: payload.response.nextPageToken,
		videoIds,
	};

	// combine previous videos into state (same as above)
	return {
		...state,
		relatedVideos,
	};
};

//***************
// selectors
//***************

export const selector_relatedVideoIds = createSelector(
	state => state.watch.relatedVideos,
	related => (related ? related.videoIds : null),
);

// // relatedVideosLoaded - VERSION 1
// // checks if at least 1 relatedVideo has been loaded to state.videos.byId
// export const selector_relatedVideosLoaded = createSelector(
// 	selector_relatedVideos,
// 	relatedVideos => (relatedVideos ? relatedVideos.length > 0 : false),
// );

// // relatedVideosLoaded - VERSION 2
// // checks if ALL relatedVideos have been loaded to state.videos.byId
export const selector_relatedVideosLoaded = createSelector(
	selector_relatedVideoIds,
	state => state.videos.byId,
	(relatedIds, videosById) =>
		relatedIds ? relatedIds.every(id => id in videosById) : false,
);

export const selector_relatedVideosNPT = createSelector(
	state => state.watch.relatedVideos,
	related => (related ? related.nextPageToken : null),
);
export const selector_relatedVideos = createSelector(
	selector_relatedVideoIds,
	state => state.videos.byId,
	(relatedIds, videos) =>
		relatedIds ? relatedIds.map(videoId => videos[videoId]) : null,
);

export const selector_watchHistory = createSelector(
	state => state.watch.history,
	state => state.videos.byId,
	(historyItems, videos) =>
		historyItems ? historyItems.map(item => videos[item.videoId]) : null,
);
