import React, { useState, useEffect } from "react";
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
	const { isComment, commentId, isVideo, videoId, ratingsBar } = props || null;
	const ratingsId = commentId || videoId;

	// functions that retrieve state of recorded vote
	const isLiked = () => (props.likedCache[ratingsId] ? true : false);
	const isDisliked = () => (props.dislikedCache[ratingsId] ? true : false);
	const isVote = () => {
		if (isLiked()) return "like";
		else if (isDisliked()) return "dislike";
		else return "";
	};
	// function determines how to submit votes based on ratings type (ie comment, video)
	const handleVote = vote => {
		if (isComment) props.submitVote(vote, "comment", commentId);
		if (isVideo) props.submitVote(vote, "video", videoId);
	};

	const [vote, setVote] = useState(isVote());
	// effect updates local vote state (style) when url changes
	useEffect(() => {
		setVote(isVote());
	}, []);

	// class (style) variables
	const highlightLiked = isLiked() ? " highlight" : "";
	const highlightDisliked = isDisliked() ? " highlight" : "";
	const commentClass = isComment ? " comment" : "";

	// TODO - Adjust to actually update likes/dislikes in global comment/video state 
	// variables to display likes/dislikes below
	const likes = props.likes
		? getAbbrevNumber(isLiked() ? props.likes + 1 : props.likes)
		: getAbbrevNumber(isLiked() ? 1 : 0);
	const dislikes = props.dislikes
		? getAbbrevNumber(isDisliked() ? props.dislikes + 1 : props.dislikes)
		: null;

	// toggles visibility of ratings bar
	const percentLikes = (props.likes / (props.likes + props.dislikes)) * 100;
	const percentLikesBar = ratingsBar ? (
		<Progress
			className="ratings-bar"
			percent={percentLikes}
			size="tiny"
			color={isLiked() ? "red" : null}
		/>
	) : null;

	return (
		<div className={"ratings" + commentClass}>
			<div
				className={"thumbs-up" + highlightLiked}
				onClick={() => {
					handleVote("like");
					setVote(isVote());
				}}>
				<Icon name="thumbs outline up" />
				<span>{likes}</span>
			</div>
			<div
				className={"thumbs-down" + highlightDisliked}
				onClick={() => {
					handleVote("dislike");
					setVote(isVote());
				}}>
				<Icon name="thumbs outline down" />
				<span>{dislikes}</span>
			</div>
			{percentLikesBar}
		</div>
	);
};

const mapStateToProps = state => ({
	likedCache: selector_likedIdsCache(state),
	dislikedCache: selector_dislikedIdsCache(state),
});

const actionCreators = {
	submitVote: userActions.action_vote,
};

export default connect(
	mapStateToProps,
	actionCreators,
)(Ratings);
