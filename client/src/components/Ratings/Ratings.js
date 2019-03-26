import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
// import styles
import "./Ratings.scss";
// import utilities
import { getAbbrevNumber } from "../../utils/format-number";
// import actions / reducers / sagas
import * as userActions from "../../store/actions/user";

const Ratings = props => {
	const likes = props.likes ? getAbbrevNumber(props.likes) : null;
	const dislikes = props.dislikes ? getAbbrevNumber(props.dislikes) : null;

	const { isComment, commentId, isVideo, videoId } = props || null;
	const commentClass = isComment ? "comment-" : "";

	const handleVote = vote => {
		if (isComment) {
			props.vote(vote, "comment", commentId);
		}
		if (isVideo) {
			props.vote(vote, "video", videoId);
		}
	};

	return (
		<div className={commentClass + "ratings"}>
			<div className="thumbs-up" onClick={() => handleVote("like")}>
				<Icon name="thumbs outline up" />
				<span>{likes}</span>
			</div>
			<div className="thumbs-down" onClick={() => handleVote("dislike")}>
				<Icon name="thumbs outline down" />
				<span>{dislikes}</span>
			</div>
		</div>
	);
};

const actionCreators = {
	vote: userActions.action_vote,
};

export default connect(
	null,
	actionCreators,
)(Ratings);
