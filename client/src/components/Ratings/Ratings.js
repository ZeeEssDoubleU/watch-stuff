import React from "react";
import PropTypes from "prop-types";
import { Icon, Progress } from "semantic-ui-react";

import "./Ratings.scss";

import { getAbbrevNumber } from "../../utils/format-number";

const Ratings = props => {
	let percentLikesBar, likes, dislikes = null;
	if (props.likes && props.dislikes) {
		const percentLikes = (props.likes / (props.likes + props.dislikes)) * 100;
		percentLikesBar = (
			<Progress className="rating-bar" percent={percentLikes} size="tiny" />
		);
		likes = getAbbrevNumber(props.likes);
		dislikes = getAbbrevNumber(props.dislikes);
	}

	return (
		<div className="ratings">
			<div className="thumbs-up">
				<Icon name="thumbs outline up" />
				<span>{likes}</span>
			</div>
			<div className="thumbs-down">
				<Icon name="thumbs outline down" />
				<span>{dislikes}</span>
			</div>
			{percentLikesBar}
		</div>
	);
};

Ratings.propTypes = {};

export default Ratings;
