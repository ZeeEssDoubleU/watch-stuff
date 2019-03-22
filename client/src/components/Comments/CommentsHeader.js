import React from "react";
import { Button, Icon } from "semantic-ui-react";

import "./CommentsHeader.scss";

const CommentsHeader = props => {
	const commentsCount = props.commentsCount
		? Number(props.commentsCount).toLocaleString()
		: props.commentsCount;
	return (
		<div className="comments-header">
			<h4>{commentsCount} Comments</h4>
			<Button
				className="sort-button"
				basic
				compact
				icon
				labelPosition="left">
				<Icon name="align left" />
				SORT BY
			</Button>
		</div>
	);
};

export default CommentsHeader;
