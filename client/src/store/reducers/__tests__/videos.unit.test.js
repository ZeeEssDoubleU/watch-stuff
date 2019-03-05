import reducer_videos from "../videos";
import * as videoActions from "../../actions/videos";
import mostPopularResponse from "./responses/MOST_POPULAR_SUCCESS.json";
import mostPopularResponse_withPrevPageToken from "./responses/MOST_POPULAR_SUCCESS_withPrevPageToken.json";
import mostPopularSuccessState_prevState from "./states/MOST_POPULAR_SUCCESS_prevState.json";
import mostPopularSuccessState from "./states/MOST_POPULAR_SUCCESS.json";
import mostPopularSuccessState_withPrevPageToken from "./states/MOST_POPULAR_SUCCESS_withPrevPageToken.json";

const initialState = {
	mostPopular: {},
	categories: {},
	byId: {},
	byCategory: {},
};

describe("videos reducer", () => {
	test("test unused action type with default initial state", () => {
		const startState = undefined;
		const action = { type: "UNUSED_ACTION_TYPE" };
		const expectedEndState = { ...initialState };
		expect(reducer_videos(startState, action)).toEqual(expectedEndState);
		expect(expectedEndState).toMatchSnapshot();
	});

	test("test with MOST_POPULAR_SUCCESS action", () => {
		const startState = { ...initialState };
		const action = {
			type: videoActions.types.MOST_POPULAR_SUCCESS,
			payload: mostPopularResponse,
		};
		const expectedEndState = {
			...startState,
			...mostPopularSuccessState,
		};
		expect(reducer_videos(startState, action)).toEqual(expectedEndState);
		expect(expectedEndState).toMatchSnapshot();
	});

	test("test for idempotence with MOST_POPULAR_SUCCESS action", () => {
		const startState = mostPopularSuccessState_prevState;
		const action = {
			type: videoActions.types.MOST_POPULAR_SUCCESS,
			payload: mostPopularResponse,
		};
		// should keep and add to previous byId data, but not keep previous omstPopular
		const expectedEndState = {
			...startState,
			mostPopular: {
				...mostPopularSuccessState.mostPopular,
			},
			byId: {
				...startState.byId,
				...mostPopularSuccessState.byId,
			},
		};
		expect(reducer_videos(startState, action)).toEqual(expectedEndState);
		expect(expectedEndState).toMatchSnapshot();
	});

	test("test for idempotence with MOST_POPULAR_SUCCESS action with prevPageToken", () => {
		const startState = mostPopularSuccessState_prevState;
		const action = {
			type: videoActions.types.MOST_POPULAR_SUCCESS,
			payload: mostPopularResponse_withPrevPageToken,
		};
		// should keep and add to previous byId and mostPopular data
		const expectedEndState = {
			...startState,
			mostPopular: {
				...mostPopularSuccessState.mostPopular,
				itemIds: [
					...startState.mostPopular.itemIds,
					...mostPopularSuccessState.mostPopular.itemIds,
				],
			},
			byId: {
				...startState.byId,
				...mostPopularSuccessState.byId,
			},
		};
		expect(reducer_videos(startState, action)).toEqual(expectedEndState);
		expect(expectedEndState).toMatchSnapshot();
	});
});
