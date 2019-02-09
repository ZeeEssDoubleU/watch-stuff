import React, { Component } from "react";
import PropTypes from "prop-types";

import "./CommentsContainer.scss";
import CommentsHeader from "./CommentsHeader";
import AddComment from "./AddComment";
import Comment from "./Comment";

class CommentsContainer extends Component {
	render() {
		return (
			<div className="comments-container">
				<CommentsHeader className='comments-header' commentCount={402}/>
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
