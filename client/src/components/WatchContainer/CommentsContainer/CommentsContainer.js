import React, { Component } from "react";
import PropTypes from "prop-types";

import "./CommentsContainer.scss";
import CommentsHeader from "./CommentsHeader/CommentsHeader";
import AddComment from "./AddComment/AddComment";
import Comment from "./Comment/Comment";

class CommentsContainer extends Component {
	render() {
		return (
			<div className="comments-container">
				<CommentsHeader />
				<AddComment />
				<Comment />
				<Comment />
				<Comment />
				<Comment />
				<Comment />
				<Comment />
				<Comment />
				<Comment />
			</div>
		);
	}
}

CommentsContainer.propTypes = {};

export default CommentsContainer;
