import { all, call, put, takeEvery } from "redux-saga/effects";

function* helloSaga() {
	console.log("Hello Saga!");
}

export default function*() {
	yield all([helloSaga()]);
}
