import React from "react";
import { Progress } from "semantic-ui-react";

const RatingsBar = props => {
	if (!props.likes && !props.dislikes) return <div />;
	const percentLikes = (props.likes / (props.likes + props.dislikes)) * 100;
	const percentLikesBar = (
		<Progress className="ratings-bar" percent={percentLikes} size="tiny" />
	);

	return <>{percentLikesBar}</>;
};

export default RatingsBar;
