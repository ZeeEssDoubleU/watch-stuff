import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Comments.scss";
import CommentsHeader from "./CommentsHeader/CommentsHeader";
import AddComment from "./AddComment/AddComment";
import Comment from "./Comment/Comment";

class Comments extends Component {
	render() {
		return (
			<div className="comments">
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

Comments.propTypes = {};

export default Comments;
