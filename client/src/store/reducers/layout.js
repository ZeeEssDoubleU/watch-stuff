import { createSelector } from "reselect";
import * as layoutActions from "../actions/layout";

const initialState = {
	sideBarVis: true,
};

//***************
// root reducer
//***************

const reducer_layout = (state = initialState, action) => {
	switch (action.type) {
		case layoutActions.types.TOGGLE_SIDEBAR:
			return { sideBarVis: !state.sideBarVis };
		default:
			return state;
	}
};
export default reducer_layout;

//***************
// sub reducers
//***************

//***************
// selectors
//***************
