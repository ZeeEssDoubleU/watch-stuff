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
			return {
				errors: {
					type: action.type,
					message: action.payload.message,
				},
			};
		default:
			return state;
	}
};
export default reducer_errors;
