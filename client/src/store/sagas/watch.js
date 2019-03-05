import { takeEvery, call } from "redux-saga/effects";
import * as youtubeApi from "../api/youtube-api";
import * as watchActions from "../actions/watch";
import * as rootSagas from "./index";
export function* saga_watchWatchDetails() {
	yield takeEvery(
		watchActions.types.WATCH_DETAILS_REQUEST,
		saga_fetchWatchDetails,
	);
}

export function* saga_fetchWatchDetails(action) {
	console.log("ACTION - FETCH WATCH DETAILS", action);
	const request = () =>
		youtubeApi.buildVideoDetailsRequest(action.payload.videoId);
	yield rootSagas.saga_fetchEntity(
		request,
		watchActions.action_fetchWatchDetails,
	);
}

export function* saga_watchRelatedVideos() {
	yield takeEvery(
		watchActions.types.RELATED_VIDEOS_REQUEST,
		saga_fetchRelatedVideos,
	);
}
export function* saga_fetchRelatedVideos(action) {
	console.log("ACTION - FETCH RELATED VIDEOS", action);
	const request = () =>
		youtubeApi.buildRelatedVideosRequest(
			action.payload.videoId,
			action.payload.amount,
		);
	yield rootSagas.saga_fetchEntity(
		request,
		watchActions.action_fetchRelatedVideos,
	);
}
