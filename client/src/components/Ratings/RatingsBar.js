import React from "react";
import PropTypes from "prop-types";
import { Progress } from "semantic-ui-react";

const RatingsBar = props => {
	if (!props.likes && !props.dislikes) return <div />;
	const percentLikes = (props.likes / (props.likes + props.dislikes)) * 100;
	const percentLikesBar = (
		<Progress className="ratings-bar" percent={percentLikes} size="tiny" />
	);

	return <>{percentLikesBar}</>;
};

RatingsBar.propTypes = {};

export default RatingsBar;
