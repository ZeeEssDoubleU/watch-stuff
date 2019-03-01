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
		request, watchActions.action_fetchWatchDetails
	);
}
