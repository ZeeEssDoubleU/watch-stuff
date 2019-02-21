import { all, call, put, fork } from "redux-saga/effects";

import { watchMostPopularVideos, watchVideoCategories } from "./videos";

export default function*() {
	yield all([
		fork(helloSaga),
		fork(watchMostPopularVideos),
		fork(watchVideoCategories),
	]);
}

function* helloSaga() {
	console.log("Hello Saga!");
}

// entity refers to action group
// entity must have request, success, failure methods
// request is function that returns promise when called
export function* fetchEntity(request, entity, ...args) {
	try {
		const response = yield call(request);
		console.log("ENTITY SUCCESS", entity.success(response.result, ...args));
		// return response.result, throwing away headers/status text
		// if headers/status are needed, return full response instead of response.result
		yield put(entity.success(response.result, ...args));
	} catch (error) {
		console.log("ENTITY FAILURE", entity.failure(error, ...args));
		yield put(entity.failure(error, ...args));
	}
}
