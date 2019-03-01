import { createSelector } from "reselect";
import * as watchActions from "../actions/watch";

const initialState = {
	details: {},
};

const reducer_watch = (state = initialState, action) => {
	switch (action.type) {
		case watchActions.types.WATCH_DETAILS_SUCCESS:
			return reducer_fetchWatchDetails(action.payload, state);
		case watchActions.types.WATCH_DETAILS_FAILURE:
			return {
				...state,
				error: action.payload.message,
			};
		default:
			return state;
	}
};

export default reducer_watch;

const reducer_fetchWatchDetails = (payload, prevState) => {
	console.log("PAYLOAD PAYLOAD", payload);
	const details = payload.items[0];
	return {
		...prevState,
		details: details,
	};
};

// SELECTORS
