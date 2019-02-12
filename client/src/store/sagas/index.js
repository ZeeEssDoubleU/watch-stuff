import { all, call, put, fork } from "redux-saga/effects";

import { watchMostPopularVideos } from "./videos";

export default function*() {
	yield all([
		fork(helloSaga),
		fork(watchMostPopularVideos),
	]);
}

function* helloSaga() {
	console.log("Hello Saga!");
}

// helper function
// entity must have request, success, failure methods
// request is a function that return promise when called
export function* fetchEntity(request, entity, ...args) {
	try {
		const response = yield call(request);
		// we directly return the result object, throwing away headers/status text
		// if headers/status are needed, return full response instead of response.result
		yield put(entity.success(response.result, ...args));
	} catch (error) {
		yield put(entity.failure(error, ...args));
	}
}
