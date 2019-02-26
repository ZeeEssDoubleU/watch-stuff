import { createSelector } from "reselect";
import * as videoActions from "../actions/videos";

const initialState = {
	categories: {},
	mostPopular: {},
	byId: {},
	byCategory: {},
};

const reducer_videos = (state = initialState, action) => {
	switch (action.type) {
		case videoActions.types.MOST_POPULAR_SUCCESS:
			return reducer_fetchMostPopular(action.payload, state);
		case videoActions.types.MOST_POPULAR_FAILURE:
			return {
				...state,
				error: action.payload.message,
			};
		case videoActions.types.VIDEO_CATEGORIES_SUCCESS:
			return reducer_fetchVideoCategories(action.payload, state);
		case videoActions.types.VIDEO_CATEGORIES_FAILURE:
			return {
				...state,
				error: action.payload.message,
			};
		case videoActions.types.MOST_POPULAR_BY_CATEGORY_SUCCESS:
			return reducer_fetchMostPopularByCategory(action.payload, state);
		// case videoActions.types.MOST_POPULAR_BY_CATEGORY_FAILURE:
		// 	return {
		// 		...state,
		// 		error: action.payload.message,
		// 	};
		default:
			return state;
	}
};

export default reducer_videos;

const reducer_fetchMostPopular = (payload, prevState) => {
	const videoMap = payload.items.reduce((obj, item) => {
		obj[item.id] = item;
		return obj;
	}, {});

	let itemIds = Object.keys(videoMap);
	console.log("PAYLOAD - MOST POPULAR VIDEOS", payload);
	console.log("MAP - VIDEOS BY ID", videoMap);

	// if prevPageToken exists, previous vids (items) have already been fetched from endpoint
	// combine previous vids into mostPopular itemIds (video ids)
	if (payload.hasOwnProperty("prevPageToken") && prevState.mostPopular) {
		itemIds = [...prevState.mostPopular.itemIds, ...itemIds];
	}

	const mostPopular = {
		totalResults: payload.pageInfo.totalResults,
		nextPageToken: payload.nextPageToken,
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

const reducer_fetchVideoCategories = (payload, prevState) => {
	const categoryMap = payload.items.reduce((obj, item) => {
		obj[item.id] = item.snippet.title;
		return obj;
	}, {});

	console.log("PAYLOAD - VIDEO CATEGORIES", payload);
	console.log("MAP - VIDEO CATEGORIES", categoryMap);

	// combine previous vids into state (same as above)
	return {
		...prevState,
		categories: categoryMap,
	};
};

const reducer_fetchMostPopularByCategory = (payload, prevState) => {
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
	console.log("MAP - VIDEOS BY ID", byIdMap);

	return {
		...prevState,
		byCategory: {
			...prevState.byCategory,
			...byCategoryMap,
		},
		byId: {
			...prevState.byId,
			...byIdMap,
		},
	};
};

// SELECTORS
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

export const selector_mostPopularVideosByCategory = createSelector(
	state => state.videosState.categories,
	state => state.videosState.byCategory,
	state => state.videosState.byId,
	(videoCategories, videosByCategory, videosById) => {
		const byCategory = {};
		for (let categoryId in videosByCategory) {
			const categoryName = videoCategories[categoryId];
			const videoIds = videosByCategory[categoryId].items;
			byCategory[categoryName] = videoIds.map(
				videoId => videosById[videoId],
			);
		}
		return byCategory;
	},
);
