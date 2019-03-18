import { takeEvery } from "redux-saga/effects";
import * as youtubeApi from "../api/youtube-api";
import * as searchActions from "../actions/search";
import * as rootSagas from "./index";

// fetch watch details
export function* saga_watchSearchVideos() {
	yield takeEvery(
		searchActions.types.SEARCH_VIDEOS_REQUEST,
		saga_fetchSearchVideos,
	);
}
export function* saga_fetchSearchVideos(action) {
	console.log("ACTION - FETCH SEARCH VIDEOS", action);
	const request = () =>
		youtubeApi.buildSearchRequest(
			action.payload.searchQuery,
			action.payload.nextPageToken,
			action.payload.amount,
		);
	yield rootSagas.saga_fetchEntity(
		request,
		searchActions.action_fetchSearchVideos,
		action.payload.searchQuery,
	);
}
