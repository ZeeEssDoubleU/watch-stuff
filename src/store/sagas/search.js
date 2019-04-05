import { takeEvery, call } from "redux-saga/effects";
import * as youtubeApi from "../api/youtube-api";
import * as searchActions from "../actions/search";
import * as rootSagas from "./index";

// fetch search videos
export function* saga_watchSearchVideos() {
	yield takeEvery(
		searchActions.types.SEARCH_VIDEOS_REQUEST,
		saga_fetchSearchVideos,
	);
}
export function* saga_fetchSearchVideos(action) {
	const { query, nextPageToken, amount } = action.payload;
	// console.log("ACTION - FETCH SEARCH VIDEOS", action);
	const request = () =>
		youtubeApi.buildSearchRequest(query, nextPageToken, amount);
	yield rootSagas.saga_fetchEntity(
		request,
		searchActions.action_fetchSearchVideos,
		query,
	);
}

// fetch search video details
export function* saga_watchSearchVideosDetails() {
	yield takeEvery(
		searchActions.types.SEARCH_VIDEOS_SUCCESS,
		saga_fetchSearchVideosDetails,
	);
}
export function* saga_fetchSearchVideosDetails(action) {
	const { response } = action.payload;
	const videoIds = response.items.map(item =>
		!item.contentDetails || !item.statistics ? item.id.videoId : null,
	);
	// console.log("ACTION - FETCH SEARCH VIDEO DETAILS", action);

	const requests = videoIds.map(videoId => {
		const request = youtubeApi.buildVideoDetailsRequest(videoId);
		return call(rootSagas.ignoreErrors(request));
	});

	yield rootSagas.saga_fetchEntities(
		requests,
		searchActions.action_fetchSearchVideosDetails,
	);
}
