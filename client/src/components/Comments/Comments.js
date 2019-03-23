import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./Comments.scss";
import CommentsHeader from "./CommentsHeader";
import AddComment from "./AddComment";
import Comment from "./Comment";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

import {
	selector_commentsLoaded,
	selector_commentsNPT,
	selector_commentsByVideo,
} from "../../store/reducers/comments";

// TODO - 1.5*
const Comments = props => {
	// initialize .comments elem state and variables to determine comments infinite scroll height
	const [commentsHeight, setCommentsHeight] = useState(0);
	const commentsElem = document.querySelector(".comments");
	const commentsElemHeight = commentsElem
		? window.innerHeight - commentsElem.offsetTop
		: window.innerHeight;
	useEffect(() => {
		setCommentsHeight(commentsElemHeight);
	}, [commentsElemHeight]);

	// variables and effect to fetch more related videos based on visibilty of loader
	const loader = document.querySelector(".comments > .loader-container");
	const loaderOffset = loader ? loader.offsetTop : 0;
	const loaderVisible = loaderOffset < window.innerHeight;
	useEffect(() => {
		if (props.commentsLoaded && loaderVisible) {
			props.fetchComments(props.videoId, props.commentsNPT);
		}
	}, [loaderOffset]);

	// fetchMoreComments functions used in InfiniteScroll
	const fetchMoreComments = () => {
		if (props.commentsLoaded && props.commentsNPT) {
			props.fetchComments(props.videoId, props.commentsNPT, 10);
		}
	};

	const comments = props.comments
		? props.comments.map(comment => (
				<Comment comment={comment} key={comment.id} />
		  ))
		: null;

	return (
		<div className="comments-container">
			<CommentsHeader
				className="comments-header"
				commentsCount={props.commentsCount}
			/>
			<AddComment />
			<div className="comments" style={{ height: commentsHeight }}>
				<InfiniteScroll
					bottomReachedCallback={() => fetchMoreComments()}
					showLoader={props.commentsNPT ? true : false}>
					{comments}
				</InfiniteScroll>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	comments: selector_commentsByVideo(state, props.videoId),
	commentsLoaded: selector_commentsLoaded(state, props.videoId),
	commentsNPT: selector_commentsNPT(state, props.videoId),
});

export default withRouter(
	connect(
		mapStateToProps,
		null,
	)(Comments),
);
