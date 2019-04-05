import reducer_user from "../user";
import * as userActions from "../../actions/user";

const initialState = {
	libraryLoaded: false,
};

describe("user reducer", () => {
	test("test unused action type with default initial state", () => {
		const startState = undefined;
		const action = { type: "UNUSED_ACTION_TYPE" };
		const expectedEndState = { ...initialState };
		expect(reducer_user(startState, action)).toEqual(expectedEndState);
	});

	test("test with YOUTUBE_LIBRARY_LOADED action", () => {
		const startState = { ...initialState };
		const action = { type: userActions.types.YOUTUBE_LIBRARY_LOADED };
		const expectedEndState = { libraryLoaded: true };
		expect(reducer_user(startState, action)).toEqual(expectedEndState);
	});

	test("test for idempotence with YOUTUBE_LIBRARY_LOADED action and library already loaded", () => {
		const startState = { libraryLoaded: true };
		const action = { type: userActions.types.YOUTUBE_LIBRARY_LOADED };
		const expectedEndState = startState;
		expect(reducer_user(startState, action)).toEqual(expectedEndState);
	});
});
