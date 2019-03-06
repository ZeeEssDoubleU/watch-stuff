import { takeEvery, call } from "redux-saga/effects";
import * as youtubeApi from "../api/youtube-api";
import * as videoActions from "../actions/videos";
import * as rootSagas from "./index";

// watch and fetch most popular vidoes
export function* saga_watchMostPopular() {
	yield takeEvery(
		videoActions.types.MOST_POPULAR_REQUEST,
		saga_fetchMostPopular,
	);
}
export function* saga_fetchMostPopular(action) {
	console.log("ACTION - FETCH MOST POPULAR VIDEOS", action);
	const request = () =>
		youtubeApi.buildMostPopularVideosRequest(
			action.payload.amount,
			action.payload.nextPageToken,
		);
	yield rootSagas.saga_fetchEntity(
		request,
		videoActions.action_fetchMostPopular,
	);
}

// watch and fetch video categories
export function* saga_watchCategories() {
	yield takeEvery(
		videoActions.types.VIDEO_CATEGORIES_REQUEST,
		saga_fetchCategories,
	);
}
export function* saga_fetchCategories(action) {
	console.log("ACTION - FETCH VIDEO CATEGORIES", action);
	const request = () => youtubeApi.buildVideoCategoriesRequest();
	yield rootSagas.saga_fetchEntity(request, videoActions.action_fetchCategory);
}

// watch and fetch most popular videos by category
export function* saga_watchMostPopularByCategory() {
	yield takeEvery(
		videoActions.types.MOST_POPULAR_BY_CATEGORY_REQUEST,
		saga_fetchMostPopularByCategory,
	);
}
export function* saga_fetchMostPopularByCategory(action) {
	console.log("ACTION - FETCH MOST POPULAR VIDEOS BY CATEGORY", action);
	const requests = action.payload.categories.map(category => {
		const request = youtubeApi.buildMostPopularVideosRequest(
			action.payload.amount,
			action.payload.nextPageToken,
			category,
		);
		// ignoreErrors is imported helper function that allows request to return responses and errors
		return call(rootSagas.ignoreErrors(request));
	});
	yield rootSagas.saga_fetchEntities(
		requests,
		videoActions.action_fetchMostPopularByCategory,
		action.payload.categories,
	);
}
