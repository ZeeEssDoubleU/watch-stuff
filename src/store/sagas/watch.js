import { takeEvery, call } from "redux-saga/effects";
import * as youtubeApi from "../api/youtube-api";
import * as watchActions from "../actions/watch";
import * as rootSagas from "./index";

// fetch watch details
export function* saga_watchWatchDetails() {
	yield takeEvery(
		watchActions.types.WATCH_DETAILS_REQUEST,
		saga_fetchWatchDetails,
	);
}
export function* saga_fetchWatchDetails(action) {
	// console.log("ACTION - FETCH WATCH DETAILS", action);
	const request = () =>
		youtubeApi.buildVideoDetailsRequest(action.payload.videoId);
	yield rootSagas.saga_fetchEntity(
		request,
		watchActions.action_fetchWatchDetails,
	);
}

// fetch related video ids
export function* saga_watchRelatedVideos() {
	yield takeEvery(
		watchActions.types.RELATED_VIDEOS_REQUEST,
		saga_fetchRelatedVideos,
	);
}
export function* saga_fetchRelatedVideos(action) {
	const { videoId, nextPageToken, amount } = action.payload;
	// console.log("ACTION - FETCH RELATED VIDEOS", action);
	const request = () =>
		youtubeApi.buildRelatedVideosRequest(videoId, nextPageToken, amount);
	yield rootSagas.saga_fetchEntity(
		request,
		watchActions.action_fetchRelatedVideos,
		videoId,
	);
}

// fetch related video details
export function* saga_watchRelatedVideoDetails() {
	yield takeEvery(
		watchActions.types.RELATED_VIDEOS_SUCCESS,
		saga_fetchRelatedVideoDetails,
	);
}
export function* saga_fetchRelatedVideoDetails(action) {
	const { response } = action.payload;
	const videoIds = response.items.map(item =>
		!item.contentDetails || !item.statistics ? item.id.videoId : null,
	);
	// console.log("ACTION - FETCH RELATED VIDEO DETAILS", action);

	const requests = videoIds.map(videoId => {
		const request = youtubeApi.buildVideoDetailsRequest(videoId);
		return call(rootSagas.ignoreErrors(request));
	});

	yield rootSagas.saga_fetchEntities(
		requests,
		watchActions.action_fetchRelatedVideoDetails,
	);
}

// fetch channel details
export function* saga_watchChannelDetails() {
	yield takeEvery(
		watchActions.types.WATCH_DETAILS_SUCCESS,
		saga_fetchChannelDetails,
	);
}
export function* saga_fetchChannelDetails(action) {
	const { channelId } = action.payload.items[0].snippet;
	// console.log("ACTION - FETCH CHANNEL DETAILS", action);

	const request = () => youtubeApi.buildChannelRequest(channelId);
	yield rootSagas.saga_fetchEntity(
		request,
		watchActions.action_fetchChannelDetails,
	);
}

// fetch video comments
export function* saga_watchComments() {
	yield takeEvery(watchActions.types.COMMENTS_REQUEST, saga_fetchComments);
}
export function* saga_fetchComments(action) {
	const { videoId, nextPageToken, amount } = action.payload;
	// console.log("ACTION - FETCH COMMENTS", action);

	const request = () =>
		youtubeApi.buildCommentsRequest(videoId, nextPageToken, amount);
	yield rootSagas.saga_fetchEntity(
		request,
		watchActions.action_fetchComments,
		videoId,
	);
}
