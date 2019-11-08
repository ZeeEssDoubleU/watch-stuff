// user action types
export const types = {
	YOUTUBE_LIBRARY_LOADED: "YOUTUBE_LIBRARY_LOADED",
	VOTE_LIKE: "VOTE_LIKE",
	VOTE_DISLIKE: "VOTE_DISLIKE",
	INCREMENT_API_INDEX: "INCREMENT_API_INDEX",
	RESET_API_INDEX: "RESET_API_INDEX",
};

export const action_vote = (vote, category, id) => ({
	type: vote === "like" ? types.VOTE_LIKE : types.VOTE_DISLIKE,
	payload: {
		vote,
		category,
		id,
	},
});

export const action_updateApiIndex = update => ({
	type:
		update === "increment"
			? types.INCREMENT_API_INDEX
			: types.RESET_API_INDEX,
	payload: {
		update,
	},
});
