import { applyMiddleware, createStore, compose } from "redux";
import reducer_root from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import throttle from "lodash.throttle";

// loads state from local storage
const loadState = () => {
	try {
		const serializedState = localStorage.getItem("state");
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

// saves state to local storage
const saveState = state => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem("state", serializedState);
	} catch {
		// ignore write errors
	}
};

const configureStore = () => {
	const initialState = {};
	const sagaMiddleware = createSagaMiddleware();
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const persistedState = loadState();

	// create store
	const store = createStore(
		reducer_root,
		persistedState || initialState,
		composeEnhancers(applyMiddleware(sagaMiddleware)),
	);

	sagaMiddleware.run(rootSaga);

	store.subscribe(
		throttle(() => {
			saveState({
				user: store.getState().user,
			});
		}, 1000),
	);

	return store;
};

export default configureStore;
