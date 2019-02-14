import videosReducer from "../videos";
import { MOST_POPULAR_SUCCESS } from "../../actions/videos";
import mostPopularResponse from "./responses/MOST_POPULAR_SUCCESS.json";
import mostPopularSuccessState from "./states/MOST_POPULAR_SUCCESS.json";

const initialState = {
	mostPopular: {},
	byId: {},
};

describe("videos reducer", () => {
	test("test unused action type with default initial state", () => {
		const startState = undefined;
		const action = { type: "UNUSED_ACTION_TYPE" };
		const expectedEndState = { ...initialState };
		expect(videosReducer(startState, action)).toEqual(expectedEndState);
	});

	test("test with YOUTUBE_LIBRARY_LOADED action", () => {
		const startState = { ...initialState };
		const action = {
			type: MOST_POPULAR_SUCCESS,
			payload: mostPopularResponse,
		};
		const expectedEndState = {
			...startState,
			...mostPopularSuccessState,
		};
		expect(videosReducer(startState, action)).toEqual(expectedEndState);
	});
});
