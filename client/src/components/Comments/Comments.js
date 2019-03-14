import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import "./Comments.scss";
import CommentsHeader from "./CommentsHeader";
import AddComment from "./AddComment";
import Comment from "./Comment";

import * as watchActions from "../../store/actions/watch";
import {
	selector_commentsLoaded,
	selector_commentsNextPageToken,
	selector_commentsByVideo,
} from "../../store/reducers/comments";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

const Comments = props => {
	const fetchMoreComments = () => {
		if (props.commentsLoaded && props.commentsNextPageToken) {
			console.log("FALKAJFALKFJDFKLJFDF");
			props.fetchComments(
				props.match.params.videoId,
				props.commentsNextPageToken,
			);
		}
	};

	const shouldShowLoader = () => {
		return props.commentsNextPageToken ? true : false;
	};

	const comments = props.comments
		? props.comments.map(comment => (
				<Comment comment={comment} key={comment.id} />
		  ))
		: null;

	// variables to determine scrollable height of comments
	const commentsElem = document.querySelector(".comments");
	const commentsHeight = commentsElem
		? window.innerHeight - commentsElem.offsetTop
		: window.innerHeight;

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
					showLoader={shouldShowLoader()}>
					{comments}
				</InfiniteScroll>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	comments: selector_commentsByVideo(state, props.match.params.videoId),
	commentsLoaded: selector_commentsLoaded(state, props.match.params.videoId),
	commentsNextPageToken: selector_commentsNextPageToken(
		state,
		props.match.params.videoId,
	),
});

const actionCreators = {
	fetchComments: watchActions.action_fetchComments.request,
};

Comments.propTypes = {};

export default withRouter(
	connect(
		mapStateToProps,
		actionCreators,
	)(Comments),
);
