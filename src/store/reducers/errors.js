import * as videoActions from "../actions/videos";
import * as watchActions from "../actions/watch";

const initialState = {
	errors: {},
};

//***************
// root reducer
//***************

const reducer_errors = (state = initialState, action) => {
	switch (action.type) {
		case videoActions.types.MOST_POPULAR_FAILURE:
		case videoActions.types.VIDEO_CATEGORIES_FAILURE:
		case videoActions.types.MOST_POPULAR_BY_CATEGORY_FAILURE:
		case watchActions.types.WATCH_DETAILS_FAILURE:
		case watchActions.types.RELATED_VIDEOS_FAILURE:
			return reducer_error(action, state);
		default:
			return state;
	}
};

export default reducer_errors;

//***************
// root reducers
//***************

const reducer_error = (action, state) => {
	const { type, payload } = action;

	const error = {
		type,
		payload,
	};

	return {
		...state,
		errors: error,
	};
};

//***************
// selectors
//***************
