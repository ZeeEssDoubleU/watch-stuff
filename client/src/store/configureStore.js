import { applyMiddleware, createStore, compose } from "redux";
import reducer_root from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const configureStore = () => {
	const initialState = {};
	const sagaMiddleware = createSagaMiddleware();
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	// create store
	const store = createStore(
		reducer_root,
		initialState,
		composeEnhancers(applyMiddleware(sagaMiddleware)),
	);

	sagaMiddleware.run(rootSaga);

	return store;
};

export default configureStore;
