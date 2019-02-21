import { call, fork, take, takeEvery } from "redux-saga/effects";
import * as youtubeApi from "../api/youtube-api";
import * as videoActions from "../actions/videos";
import { fetchEntity } from "./index";

// watch and fect most popular vidoes
export function* watchMostPopularVideos() {
	yield takeEvery(videoActions.MOST_POPULAR_REQUEST, fetchMostPopularVideos);
}
export function* fetchMostPopularVideos(action) {
	console.log("ACTION - FETCH MOST POPULAR", action);
	const request = () =>
		youtubeApi.buildMostPopularVideosRequest(
			action.payload.amount,
			action.payload.loadDescription,
			action.payload.nextPageToken,
		);
	yield fetchEntity(request, videoActions.fetchMostPopularVideos);
}

// watch and fetch video categories
export function* watchVideoCategories() {
	yield takeEvery(videoActions.VIDEO_CATEGORIES_REQUEST, fetchVideoCategories);
}
export function* fetchVideoCategories(action) {
	console.log("ACTION - FETCH VIDEO CATEGORIES", action);
	const request = () => youtubeApi.buildVideoCategoriesRequest();
	yield fetchEntity(request, videoActions.fetchVideoCategories);
}
