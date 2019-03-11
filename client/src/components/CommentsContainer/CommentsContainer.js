import React from "react";
import PropTypes from "prop-types";

import "./CommentsContainer.scss";
import CommentsHeader from "./CommentsHeader";
import AddComment from "./AddComment";
import Comment from "./Comment";

const CommentsContainer = props => {
	const comments = props.comments
		? props.comments.map(comment => (
				<Comment comment={comment} key={comment.id} />
		  ))
		: null;

	console.log("COMMENT COMMMENT COMELKLAGDJFLK", comments);

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
				{comments}
			</div>
		</div>
	);
};

CommentsContainer.propTypes = {};

export default CommentsContainer;
