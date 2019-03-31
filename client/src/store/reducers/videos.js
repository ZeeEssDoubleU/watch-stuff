import { createSelector } from "reselect";
import * as videoActions from "../actions/videos";
import * as watchActions from "../actions/watch";
import * as searchActions from "../actions/search";

const initialState = {
	categories: {},
	mostPopular: {},
	byId: {},
	byCategory: {},
};

//***************
// root reducer
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
		// case searchActions.types.SEARCH_VIDEOS_SUCCESS:
		// 	return reducer_fetchSearchVideos(action.payload, state);
		case watchActions.types.RELATED_VIDEO_DETAILS_SUCCESS:
		case searchActions.types.SEARCH_VIDEOS_DETAILS_SUCCESS:
			return reducer_fetchVideoDetails(action.payload, state);
		default:
			return state;
	}
};
export default reducer_videos;

//***************
// sub reducers - videos
//***************

const reducer_fetchMostPopular = (payload, state) => {
	const prevIds = state.mostPopular.itemIds || [];
	const newIds = payload.items.map(item => item.id);
	const videoMap = {};
	payload.items.forEach(item => (videoMap[item.id] = item));

	// console.log("PAYLOAD - MOST POPULAR VIDEOS", payload);
	// console.log("MAP - MOST POPULAR VIDEOS BY ID", videoMap);

	const mostPopular = {
		totalResults: payload.pageInfo.totalResults,
		nextPageToken: payload.nextPageToken,
		itemIds: Array.from(new Set([...prevIds, ...newIds])),
	};

	// combine previous videos into state (same as above)
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

	// console.log("PAYLOAD - VIDEO CATEGORIES", payload);
	// console.log("MAP - VIDEO CATEGORIES", categoryMap);

	// combine previous videos into state (same as above)
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

	// console.log("PAYLOAD - MOST POPULAR VIDEOS BY CATEGORY", payload);
	// console.log("MAP - MOST POPULAR VIDEOS BY CATEGORY", byCategoryMap);
	// console.log("MAP - CATEGORY VIDEOS BY ID", byIdMap);

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
// sub reducers - watch / search
//***************

// reducers adds watch details to state.videos.byId
// another version exists in watch.js
const reducer_fetchWatchDetails = (payload, state) => {
	const details = payload.items[0];
	const videoId = details.id;

	// console.log("PAYLOAD - FETCH WATCH DETAILS", payload);

	// add watch video details to byId lookup table
	return {
		...state,
		byId: {
			...state.byId,
			[videoId]: details,
		},
	};
};

// fetches additional data for related videos and adds them to state.videos.byId
// fetches details for watch related videos and search videos
const reducer_fetchVideoDetails = (payload, state) => {
	const videoMap = {};
	payload.forEach(response => {
		const video = response.items[0] || null;
		videoMap[video.id] = video || null;
	});

	// console.log("PAYLOAD - FETCH RELATED/SEARCH VIDEOS DETAILS", payload);
	// console.log("MAP - RELATED/SEARCH VIDEOS BY ID", videoMap);

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
// selectors
//***************

export const selector_mostPopularIds = createSelector(
	state => state.videos.mostPopular,
	mostPopular => (mostPopular.itemIds ? mostPopular.itemIds : []),
);

// checks if ALL mostPopular itemIds have been loaded to state.video.byId
export const selector_mostPopularLoaded = createSelector(
	selector_mostPopularIds,
	state => state.videos.byId,
	// return true - every mostPopular itemId exists in videosById
	// return false - any mostPopular itemId doesn't exist in videosById
	// return false - mostPopular array is empty
	(mostPopular, videosById) =>
		mostPopular.length > 0
			? mostPopular.every(id => id in videosById)
			: false,
);

export const selector_mostPopularVideos = createSelector(
	selector_mostPopularIds,
	state => state.videos.byId,
	(mostPopular, videosById) => mostPopular.map(id => videosById[id]),
);

export const selector_mostPopularNPT = createSelector(
	state => state.videos.mostPopular,
	mostPopular =>
		mostPopular.nextPageToken ? mostPopular.nextPageToken : null,
);

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
	categories => Object.keys(categories).length,
);

// returns object of videos sorted by category names
export const selector_videosByCategory = createSelector(
	state => state.videos.categories,
	state => state.videos.byCategory,
	state => state.videos.byId,
	(categories, videoIdsByCategory, videosById) => {
		const byCategory = {};
		// assign category ids that contain video results
		const categoryIds = Object.keys(videoIdsByCategory);
		categoryIds.forEach(categoryId => {
			// for each category id, assign category name
			const categoryName = categories[categoryId];
			// assign category id's video results
			const videoIds = videoIdsByCategory[categoryId].items;
			// assign category names to byCategory object
			// assign array of item object to each category name in byCategory object
			byCategory[categoryName] = videoIds.map(
				videoId => videosById[videoId],
			);
		});
		return byCategory;
	},
);

// checks if ALL videosByCategory itemIds have been loaded to state.video.byId
export const selector_videosByCategoryLoaded = createSelector(
	state => state.videos.byCategory,
	state => state.videos.byId,
	(byCategory, videosById) => {
		// assign category ids that contain video results
		const categoryIds = Object.keys(byCategory);
		// array to keep record of ALL category video ids
		let totalIds = [];
		categoryIds.forEach(category => {
			// for each category id, assign associated video ids
			const videoIds = byCategory[category].items;
			totalIds.push(...videoIds);
		});
		// return true - EVERY videosByCategory videoId exists in state.videos.byId
		// return false - ANY videosByCategory videoId doesn't exist in state.videos.byId
		// return false - totalIds array is empty
		return totalIds.length > 0
			? totalIds.every(id => id in videosById)
			: false;
	},
);

// this selector is mirrored in watch.js as selector_watchDetails
export const selector_videoById = createSelector(
	(state, videoId) => state.videos.byId[videoId],
	video => video,
);
