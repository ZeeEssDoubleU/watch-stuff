import { createSelector } from "reselect";
import { MOST_POPULAR_SUCCESS, MOST_POPULAR_FAILURE } from "../actions/videos";

const initialState = {
	mostPopular: {},
	byId: {},
};

const videosReducer = (state = initialState, action) => {
	switch (action.type) {
		case MOST_POPULAR_SUCCESS:
			return fetchMostPopularVideosReducer(action.payload, state);
		case MOST_POPULAR_FAILURE:
			return {
				...state,
				error: action.payload.message,
			};
		default:
			return state;
	}
};

export default videosReducer;

// response param is action.payload
const fetchMostPopularVideosReducer = (response, prevState) => {
	const videoMap = response.items.reduce((obj, item) => {
		obj[item.id] = item;
		return obj;
	}, {});

	let itemIds = Object.keys(videoMap);
	console.log("RESPONSE", response);
	console.log("VIDEO MAP", videoMap);

	// if prevPageToken exists, previous vids (items) have already been fetched from endpoint
	// combine previous vids into mostPopular itemIds (video ids)
	if (response.hasOwnProperty("prevPageToken") && prevState.mostPopular) {
		itemIds = [...prevState.mostPopular.itemIds, ...itemIds];
	}

	const mostPopular = {
		totalResults: response.pageInfo.totalResults,
		nextPageToken: response.nextPageToken,
		itemIds,
	};

	// combine previous vids into state (same as above)
	return {
		...prevState,
		mostPopular,
		byId: {
			...prevState.byId,
			...videoMap,
		},
	};
};

// SELECTORS
export const getMostPopularVideos = createSelector(
	state => state.videosState.byId,
	state => state.videosState.mostPopular,
	(videosById, mostPopular) => {
		// if no mostPopular items exist, return []
		if (!mostPopular || !mostPopular.itemIds) {
			return [];
		}
		// map mostPopular items to an array, using mostPopular itemIds in byId lookup table
		return mostPopular.itemIds.map(id => videosById[id]);
	},
);