import { createSelector } from "reselect";
import * as watchActions from "../actions/watch";

const initialState = {
	details: {},
	relatedVideos: {},
};

const reducer_watch = (state = initialState, action) => {
	switch (action.type) {
		case watchActions.types.WATCH_DETAILS_SUCCESS:
			return {
				...state,
				details: action.payload.items[0],
			};
		case watchActions.types.RELATED_VIDEOS_SUCCESS:
			return reducer_fetchRelatedVideos(action.payload, state);
		default:
			return state;
	}
};

export default reducer_watch;

const reducer_fetchRelatedVideos = (payload, state) => {
	const itemIds = payload.items.map(item => item.id.videoId);

	console.log("PAYLOAD - RELATED VIDEOS", payload);
	console.log("MAP - RELATED VIDEO IDS", itemIds);

	const relatedVideos = {
		totalResults: payload.pageInfo.totalResults,
		nextPageToken: payload.nextPageToken,
		itemIds,
	};

	// combine previous vids into state (same as above)
	return {
		...state,
		relatedVideos,
	};
};

// SELECTORS
export const selector_watchDetails = state => state.watchState.details;
