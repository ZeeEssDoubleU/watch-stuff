import React, { useState } from "react";
import { Button, Image } from "semantic-ui-react";

import { getFormattedTimeAgo } from "../../utils/format-time";

import "./Comment.scss";
import Ratings from "../Ratings/Ratings";

const Comment = props => {
	const [collapsed, toggleCollapse] = useState(true);

	const commentId = props.comment.id;
	const comment = props.comment.snippet.topLevelComment.snippet;
	const commentIcon = comment.authorProfileImageUrl;
	const commentAuthor = comment.authorDisplayName;
	const commentAuthorUrl = comment.authorChannelUrl;
	const commentText = <p className="comment-text">{comment.textOriginal}</p>;
	const commentDate = getFormattedTimeAgo(comment.updatedAt);
	const commentLikes = comment.likeCount;

	const commentVisibility = collapsed ? "collapsed" : "expanded";
	const buttonText = collapsed ? "Read more" : "Read less";

	return (
		<div className="comment-container">
			<a href={commentAuthorUrl} target="_blank">
				<Image className="user-image" src={commentIcon} circular />
			</a>
			<div className="comment-items">
				<div className="user-name">{commentAuthor}</div>
				<div className="comment-date">{commentDate}</div>
				<div className="comment-body">
					<div className={commentVisibility}>{commentText}</div>
					<Button
						className="show-more-button"
						compact
						onClick={() => toggleCollapse(!collapsed)}>
						{buttonText}
					</Button>
				</div>
				<div className="comment-actions">
					<Ratings
						likes={commentLikes}
						isComment={true}
						commentId={commentId}
					/>
					<Button size="mini" compact>
						REPLY
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Comment;
