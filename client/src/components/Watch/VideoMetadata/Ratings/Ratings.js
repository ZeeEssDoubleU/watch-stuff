import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Progress } from "semantic-ui-react";

import "./Ratings.scss";

const Ratings = props => {
	let progress = null;
	if (props.likes && props.dislikes) {
		const percent = (props.likes / (props.likes + props.dislikes)) * 100;
		progress = <Progress className="progress" percent={percent} size="tiny" />;
	}
	return (
		<div className="ratings">
			<div className="thumbs-up">
				<Icon name="thumbs outline up" />
				<span>{props.likes}</span>
			</div>
			<div className="thumbs-down">
				<Icon name="thumbs outline down" />
				<span>{props.dislikes}</span>
			</div>
			{progress}
		</div>
	);
};

Ratings.propTypes = {};

export default Ratings;
