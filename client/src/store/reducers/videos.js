import { MOST_POPULAR_SUCCESS } from "../actions/videos";

const initialState = {
	byId: {},
	mostPopular: {},
};

const videosReducer = (state = initialState, action) => {
	switch (action.type) {
		case MOST_POPULAR_SUCCESS:
			return fetchMostPopularVideosReducer(action.response, state);
		default:
			return state;
	}
};

export default videosReducer;

const fetchMostPopularVideosReducer = (response, prevState) => {
	const videoMap = response.items.reduce((obj, video) => {
		obj[video.id] = video;
		return obj;
	}, {});

	// const videoObj = {};
	// const videoMap2 = response.items.map(video => {
	//    videoObj[video.id] = video;
	//    return videoObj;
	// });

	let itemIds = Object.keys(videoMap);
	console.log("VIDEOMAP:", videoMap);
	console.log("itemIds:", itemIds);

	if (response.hasOwnProperty("prevPageToken") && prevState.mostPopular) {
		itemIds = [...prevState.mostPopular.itemIds, ...itemIds];
	}

	const mostPopular = {
		totalResults: response.pageInfo.totalResults,
		nextPageToken: response.nextPageToken,
		itemIds,
	};

	return {
		...prevState,
		byId: {
			...prevState.byId,
			...videoMap,
		},
		mostPopular,
	};
};
