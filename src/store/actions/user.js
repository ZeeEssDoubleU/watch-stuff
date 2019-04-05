// user action types
export const types = {
	YOUTUBE_LIBRARY_LOADED: "YOUTUBE_LIBRARY_LOADED",
	VOTE_LIKE: "VOTE_LIKE",
	VOTE_DISLIKE: "VOTE_DISLIKE",
};

export const action_vote = (vote, category, id) => {
	return {
		type: vote === "like" 
			? types.VOTE_LIKE 
			: types.VOTE_DISLIKE,
		payload: {
			vote,
			category,
			id,
		},
	};
};
