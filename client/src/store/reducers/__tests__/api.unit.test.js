import apiReducer from "../api";
import { YOUTUBE_LIBRARY_LOADED } from "../../actions/api";

const initialState = {
	libraryLoaded: false,
};

describe("api reducer", () => {
	test("test unused action type with default initial state", () => {
		const startState = undefined;
		const action = { type: "UNUSED_ACTION_TYPE" };
		const expectedEndState = { ...initialState };
		expect(apiReducer(startState, action)).toEqual(expectedEndState);
	});

	test("test with YOUTUBE_LIBRARY_LOADED action", () => {
		const startState = { ...initialState };
		const action = { type: YOUTUBE_LIBRARY_LOADED };
		const expectedEndState = { libraryLoaded: true };
		expect(apiReducer(startState, action)).toEqual(expectedEndState);
	});

	test("test for idempotence with YOUTUBE_LIBRARY_LOADED action and library already loaded", () => {
		const startState = { libraryLoaded: true };
		const action = { type: YOUTUBE_LIBRARY_LOADED };
		const expectedEndState = startState;
		expect(apiReducer(startState, action)).toEqual(expectedEndState);
	});
});
