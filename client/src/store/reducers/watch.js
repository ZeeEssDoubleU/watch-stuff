import { createSelector } from "reselect";
import * as watchActions from "../actions/watch";

const initialState = {
	details: {},
	relatedVideos: {},
};

//***************
// root reducer
//***************

const reducer_watch = (state = initialState, action) => {
	switch (action.type) {
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

const reducer_fetchWatchDetails = (payload, state) => ({
	...state,
	details: payload.items[0],
});

const reducer_fetchRelatedVideos = (payload, state) => {
	const { response } = payload;
	const prevIds = state.relatedVideos.videoIds || [];
	const newIds = response.items.map(item => item.id.videoId);

	console.log("PAYLOAD - RELATED VIDEOS", payload);

	const relatedVideos = {
		totalResults: payload.response.pageInfo.totalResults,
		nextPageToken: payload.response.nextPageToken,
		videoIds: Array.from(new Set([...prevIds, ...newIds])),
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

export const selector_watchDetails = createSelector(
	state => state.watch.details,
	details => details || null,
);

export const selector_videoById = createSelector(
	(state, videoId) => state.videos.byId[videoId],
	video => video || null,
);

export const selector_relatedVideoIds = createSelector(
	state => state.watch.relatedVideos,
	related => (related ? related.videoIds : []),
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

export const selector_relatedVideosLoaded = createSelector(
	selector_relatedVideos,
	relatedVideos => (relatedVideos ? relatedVideos.length > 0 : false),
);
