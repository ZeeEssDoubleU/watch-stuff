import { createSelector } from "reselect";
import * as videoActions from "../actions/videos";
import * as watchActions from "../actions/watch";

const initialState = {
	categories: {},
	mostPopular: {},
	byId: {},
	byCategory: {},
	related: {},
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
	const videoId = payload.videoId;
	const prevIds = state.related[videoId]
		? state.related[videoId].videoIds
		: [];
	const newIds = response.items.map(item => item.id.videoId);

	console.log("PAYLOAD - RELATED VIDEOS", payload);
	console.log("MAP - RELATED VIDEO IDS", newIds);

	const relatedVideos = {
		totalResults: response.pageInfo.totalResults,
		nextPageToken: response.nextPageToken,
		videoIds: Array.from(new Set([...prevIds, ...newIds])),
	};

	// place related video ids into lookup table based on original videoId
	return {
		...state,
		related: {
			...state.related,
			[videoId]: relatedVideos,
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
	state => state.videos.mostPopular,
	state => state.videos.byId,
	(mostPopular, videosById) => {
		// return [] - no mostPopular items exist
		// return array - map videos using mostPopular itemIds to look up video data from videosById
		return !mostPopular || !mostPopular.itemIds
			? []
			: mostPopular.itemIds.map(id => videosById[id]);
	},
);

// mostPopularLoaded - VERSION 1
// checks if ALL mostPopular itemIds have been loaded to state.video.byId
export const selector_mostPopularLoaded = createSelector(
	state => state.videos.mostPopular,
	state => state.videos.byId,
	(mostPopular, videosById) => {
		// return false - no mostPopular itemIds or no videosById exist
		// return true - every mostPopular itemId exists in videosById
		// return false - any mostPopular itemId doesn't exist in videosById
		return !mostPopular || !mostPopular.itemIds || !videosById
			? false
			: mostPopular.itemIds.every(id => id in videosById);
	},
);

// // mostPopularLoaded - VERSION 2
// // returns true if only 1 mostPopular video has been loaded to state.video.byId
// export const selector_mostPopularLoaded = createSelector(
// 	selector_mostPopularVideos,
// 	mostPopular => mostPopular.length > 0
// )

export const selector_categories = createSelector(
	state => state.videos.categories,
	categories => Object.keys(categories),
);

export const selector_categoriesLoaded = createSelector(
	selector_categories,
	categoriesArray => categoriesArray.length > 0,
);

export const selector_validCategoriesLength = createSelector(
	state => state.videos.byCategory,
	categories => (categories ? Object.keys(categories).length : 0),
);

export const selector_validCategoriesLoaded = createSelector(
	selector_validCategoriesLength,
	length => length > 0,
);

// returns object of videos sorted by category names
export const selector_videosByCategory = createSelector(
	state => state.videos.categories,
	state => state.videos.byCategory,
	state => state.videos.byId,
	(categories, videoIdsByCategory, videosById) => {
		const byCategory = {};
		const categoryIds = Object.keys(videoIdsByCategory);
		categoryIds.forEach(categoryId => {
			const categoryName = categories[categoryId];
			const videoIds = videoIdsByCategory[categoryId].items;
			byCategory[categoryName] = videoIds.map(
				videoId => videosById[videoId],
			);
		});
		return byCategory;
	},
);

// // videosByCategoryLength - VERSION 1
// // returns amount of videosByCategory DO exist in state.video.byId
// export const selector_videosByCategoryLength = createSelector(
// 	selector_videosByCategory,
// 	vidsByCategory => {
// 		const categories = Object.keys(vidsByCategory);
// 		let totalVids = 0;
// 		categories.forEach(category => {
// 			const categoryCount = vidsByCategory[category].length;
// 			totalVids += categoryCount;
// 		});
// 		return totalVids;
// 	},
// );

// videosByCategoryLength - VERSION 2
// returns amount of videoIds that SHOULD exist in state.video.byId
export const selector_videosByCategoryLength = createSelector(
	state => state.videos.byCategory,
	byCategory => {
		let totalVideos = 0;
		const categories = Object.keys(byCategory);
		categories.forEach(category => {
			const vidCount = byCategory[category].items.length;
			totalVideos += vidCount;
		});
		return totalVideos;
	},
);

// videosByCategoryLoaded - VERSION 1
// checks if ALL videosByCategory itemIds have been loaded to state.video.byId
export const selector_videosByCategoryLoaded = createSelector(
	state => state.videos.byCategory,
	state => state.videos.byId,
	(byCategory, videosById) => {
		const categories = Object.keys(byCategory);
		const videoIds = Object.keys(videosById);
		let totalIds = [];
		categories.forEach(category => {
			const videoIds = byCategory[category].items;
			totalIds.push(...videoIds);
		});
		// return false - no byCategories or byIds exist
		// return true - EVERY videosByCategory videoId exists in state.videos.byId
		// return false - ANY videosByCategory videoId doesn't exist in state.videos.byId
		return !categories.length || !videoIds.length
			? false
			: totalIds.every(id => id in videosById);
	},
);

// // videosByCategoryLoaded - VERSION 2
// // return true if only 1 videosByCategory video has been loaded to state.videos.byId
// export const selector_videosByCategoryLoaded = createSelector(
// 	selector_videosByCategoryLength,
// 	length => length > 0,
// );

// this selector is mirrored in watch.js as selector_watchDetails
export const selector_videoById = createSelector(
	(state, videoId) => state.videos.byId[videoId],
	video => (video ? video : null),
);

export const selector_relatedVideoIds = createSelector(
	(state, videoId) => state.videos.related[videoId],
	related => (related ? related.videoIds : []),
);

export const selector_relatedVidsNextPageToken = createSelector(
	(state, videoId) => state.videos.related[videoId],
	related => (related ? related.nextPageToken : null),
);

export const selector_relatedVideos = createSelector(
	selector_relatedVideoIds,
	state => state.videos.byId,
	(relatedIds, videos) => relatedIds.map(videoId => videos[videoId]),
);

export const selector_relatedVidsLoaded = createSelector(
	selector_relatedVideos,
	relatedVids => (relatedVids ? relatedVids.length > 0 : false),
);
