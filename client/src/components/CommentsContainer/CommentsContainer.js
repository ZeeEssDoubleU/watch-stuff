import React from "react";
import PropTypes from "prop-types";

import "./CommentsContainer.scss";
import CommentsHeader from "./CommentsHeader";
import AddComment from "./AddComment";
import Comment from "./Comment";

const CommentsContainer = props => {
	// variables to determine scrollable height of comments
	const commentsElem = document.querySelector(".comments");
	const commentsHeight = commentsElem
		? window.innerHeight - commentsElem.offsetTop
		: window.innerHeight;

	return (
		<div className="comments-container">
			<CommentsHeader className="comments-header" commentCount={402} />
			<AddComment />
			<div className="comments" style={{ height: commentsHeight }}>
				<Comment />
				<Comment />
				<Comment />
				<Comment />
				<Comment />
				<Comment />
				<Comment />
				<Comment />
			</div>
		</div>
	);
};

CommentsContainer.propTypes = {};

export default CommentsContainer;
