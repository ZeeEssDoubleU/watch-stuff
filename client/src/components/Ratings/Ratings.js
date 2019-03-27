import React from "react";
import { connect } from "react-redux";
import { Icon, Progress } from "semantic-ui-react";
// import styles
import "./Ratings.scss";
// import utilities
import { getAbbrevNumber } from "../../utils/format-number";
// import actions / reducers / sagas
import * as userActions from "../../store/actions/user";
import {
	selector_likedIdsCache,
	selector_dislikedIdsCache,
} from "../../store/reducers/user";

const Ratings = props => {
	const likes = props.likes ? getAbbrevNumber(props.likes) : null;
	const dislikes = props.dislikes ? getAbbrevNumber(props.dislikes) : null;

	const percentLikes = (props.likes / (props.likes + props.dislikes)) * 100;
	const percentLikesBar = props.ratingsBar ? (
		<Progress className="ratings-bar" percent={percentLikes} size="tiny" />
	) : null;

	const { isComment, commentId, isVideo, videoId } = props || null;
	const commentClass = isComment ? "-comment" : "";

	const handleVote = vote => {
		if (isComment) props.vote(vote, "comment", commentId);
		if (isVideo) props.vote(vote, "video", videoId);
	};

	return (
			<div className={"ratings" + commentClass}>
				<div className="thumbs-up" onClick={() => handleVote("like")}>
					<Icon name="thumbs outline up" />
					<span>{likes}</span>
				</div>
				<div className="thumbs-down" onClick={() => handleVote("dislike")}>
					<Icon name="thumbs outline down" />
					<span>{dislikes}</span>
				</div>
				{percentLikesBar}
			</div>
	);
};

const mapStateToProps = state => ({
	isLiked: selector_likedIdsCache(state),
	isDisliked: selector_dislikedIdsCache(state),
});

const actionCreators = {
	vote: userActions.action_vote,
};

export default connect(
	mapStateToProps,
	actionCreators,
)(Ratings);
