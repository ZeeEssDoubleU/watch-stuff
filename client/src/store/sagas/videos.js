import { call, fork, take, takeEvery } from "redux-saga/effects";
import * as youtubeApi from "../api/youtube-api";
import * as videoActions from "../actions/videos";
import { fetchEntity } from "./index";

export function* watchMostPopularVideos() {
	yield takeEvery(videoActions.MOST_POPULAR_REQUEST, fetchMostPopularVideos);
}
export function* fetchMostPopularVideos(action) {
	console.log("ACTION", action);
	const request = () =>
		youtubeApi.buildMostPopularVideosRequest(
			action.payload.amount,
			action.payload.loadDescription,
			action.payload.nextPageToken,
      );
	yield fetchEntity(request, videoActions.fetchMostPopularVideos);
}