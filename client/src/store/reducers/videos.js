import { createSelector } from "reselect";
import * as videoActions from "../actions/videos";
import * as watchActions from "../actions/watch";

const initialState = {
	categories: {},
	mostPopular: {},
	byId: {},
	byCategory: {},
	relatedVideos: {},
};

//***************
// VIDEO REDUCERS
//***************

const reducer_videos = (state = initialState, action) => {
	switch (action.type) {
		case videoActions.types.MOST_POPULAR_SUCCESS:
			return reducer_fetchMostPopular(action.payload, state);
		case videoActions.types.VIDEO_CATEGORIES_SUCCESS:
			return reducer_fetchVideoCategories(action.payload, state);
		case videoActions.types.MOST_POPULAR_BY_CATEGORY_SUCCESS:
			return reducer_fetchMostPopularByCategory(action.payload, state);
		case watchActions.types.WATCH_DETAILS_SUCCESS:
			return reducer_fetchWatchDetails(action.payload, state);
		case watchActions.types.RELATED_VIDEOS_SUCCESS:
			return reducer_fetchRelatedVideos(action.payload, state);
		case watchActions.types.RELATED_VIDEO_DETAILS_SUCCESS:
			return reducer_fetchRelatedVideoDetails(action.payload, state);
		default:
			return state;
	}
};

export default reducer_videos;

const reducer_fetchMostPopular = (payload, state) => {
	const videoMap = payload.items.reduce((obj, item) => {
		obj[item.id] = item;
		return obj;
	}, {});

	let itemIds = Object.keys(videoMap);
	console.log("PAYLOAD - MOST POPULAR VIDEOS", payload);
	console.log("MAP - MOST POPULAR VIDEOS BY ID", videoMap);

	// if prevPageToken exists, previous vids (items) have already been fetched from endpoint
	// combine previous vids into mostPopular itemIds (video ids)
	if (payload.hasOwnProperty("prevPageToken") && state.mostPopular) {
		itemIds = [...state.mostPopular.itemIds, ...itemIds];
	}

	const mostPopular = {
		totalResults: payload.pageInfo.totalResults,
		nextPageToken: payload.nextPageToken,
		itemIds,
	};

	// combine previous vids into state (same as above)
	return {
		...state,
		mostPopular,
		byId: {
			...state.byId,
			...videoMap,
		},
	};
};

const reducer_fetchVideoCategories = (payload, state) => {
	const categoryMap = payload.items.reduce((obj, item) => {
		obj[item.id] = item.snippet.title;
		return obj;
	}, {});

	console.log("PAYLOAD - VIDEO CATEGORIES", payload);
	console.log("MAP - VIDEO CATEGORIES", categoryMap);

	// combine previous vids into state (same as above)
	return {
		...state,
		categories: categoryMap,
	};
};

const reducer_fetchMostPopularByCategory = (payload, state) => {
	const { categories, response } = payload;
	const byIdMap = {};
	const byCategoryMap = {};

	response.forEach((category, index) => {
		if (!category.hasOwnProperty("errors")) {
			if (category.items.length > 0) {
				// map categories to byCategoryMap
				byCategoryMap[categories[index]] = {
					nextPageToken: category.nextPageToken,
					pageInfo: category.pageInfo,
					// map only video ids to category items.  Rest of video data exists in byId
					items: category.items.map(item => item.id),
				};
				// map category items (using item.id) to byIdMap
				category.items.forEach(item => (byIdMap[item.id] = item));
			}
		}
	});

	console.log("PAYLOAD - MOST POPULAR VIDEOS BY CATEGORY", payload);
	console.log("MAP - MOST POPULAR VIDEOS BY CATEGORY", byCategoryMap);
	console.log("MAP - CATEGORY VIDEOS BY ID", byIdMap);

	return {
		...state,
		byCategory: {
			...state.byCategory,
			...byCategoryMap,
		},
		byId: {
			...state.byId,
			...byIdMap,
		},
	};
};

//***************
// WATCH REDUCERS
//***************

// this reducer is mirrors in watch.js as reducer_fetchWatchDetails
const reducer_fetchWatchDetails = (payload, state) => {
	console.log("PAYLOAD - FETCH WATCH DETAILS", payload);
	const details = payload.items[0];
	const videoId = details.id;

	// add watch video details to byId lookup table
	return {
		...state,
		byId: {
			...state.byId,
			[videoId]: details,
		},
	};
};

const reducer_fetchRelatedVideos = (payload, state) => {
	const response = payload.response;
	const videoIds = response.items.map(item => item.id.videoId);

	console.log("PAYLOAD - RELATED VIDEOS", response);
	console.log("MAP - RELATED VIDEO IDS", videoIds);

	const relatedVideos = {
		totalResults: response.pageInfo.totalResults,
		nextPageToken: response.nextPageToken,
		videoIds,
	};

	// place related video ids into lookup table based on original videoId
	return {
		...state,
		relatedVideos: {
			...state.relatedVideos,
			[payload.videoId]: relatedVideos,
		},
	};
};

const reducer_fetchRelatedVideoDetails = (payload, state) => {
	const videoMap = payload.reduce((obj, response) => {
		const video = response.items ? response.items[0] : null;
		if (!video) return obj;
		obj[video.id] = video;
		return obj;
	}, {});
	console.log("PAYLOAD - FETCH RELATED VIDEO DETAILS", payload);
	console.log("MAP - RELATED VIDEOS BY ID", videoMap);

	// add related video details to byId lookup table
	return {
		...state,
		byId: {
			...state.byId,
			...videoMap,
		},
	};
};

//***************
// SELECTORS
//***************
export const selector_mostPopularVideos = createSelector(
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

export const selector_videoCategories = createSelector(
	state => state.videosState.categories,
	categories => Object.keys(categories),
);

export const selector_videoCategoriesLoaded = createSelector(
	state => state.videosState.categories,
	categories => Object.keys(categories).length > 0,
);

export const selector_mostPopularVideosByCategory = createSelector(
	state => state.videosState.categories,
	state => state.videosState.byCategory,
	state => state.videosState.byId,
	(videoCategories, videosByCategory, videosById) => {
		const byCategory = {};
		const categoryIds = Object.keys(videosByCategory);
		categoryIds.forEach(categoryId => {
			const categoryName = videoCategories[categoryId];
			const videoIds = videosByCategory[categoryId].items;
			byCategory[categoryName] = videoIds.map(
				videoId => videosById[videoId],
			);
		});
		return byCategory;
	},
);

export const selector_mostPopularVideosByCategoryLoaded = createSelector(
	state => state.videosState.byCategory,
	byCategory => Object.keys(byCategory).length > 0,
);

export const selector_mostPopularVideosByCategoryLength = createSelector(
	state => state.videosState.byCategory,
	byCategory => Object.keys(byCategory).length,
);

// this selector is mirrored in watch.js as selector_watchDetails
export const selector_videoById = (state, videoId) =>
	state.videosState.byId[videoId];

// export const selector_relatedVideos = createSelector(

// )
