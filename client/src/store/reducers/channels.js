import { createSelector } from "reselect";
import * as watchActions from "../actions/watch";

const initialState = {
	byId: {},
};

//***************
// CHANNELS REDUCERS
//***************

const reducer_channels = (state = initialState, action) => {
	switch (action.type) {
		case watchActions.types.CHANNEL_DETAILS_SUCCESS:
			return reducer_fetchChannelDetails(action.payload, state);
		default:
			return state;
	}
};

export default reducer_channels;

const reducer_fetchChannelDetails = (payload, state) => {
	const channel = payload.items[0];
	console.log("PAYLOAD - CHANNEL DETAILS", payload);

	return {
		...state,
		byId: {
			...state.byId,
			[channel.id]: channel,
		},
	};
};

// SELECTORS
