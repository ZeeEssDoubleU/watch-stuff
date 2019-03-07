import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

import "./Ratings.scss";

import { getAbbrevNumber } from "../../utils/format-number";

const Ratings = props => {
	const likes = props.likes ? getAbbrevNumber(props.likes) : null;
	const dislikes = props.dislikes ? getAbbrevNumber(props.dislikes) : null;

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
		</div>
	);
};

Ratings.propTypes = {};

export default Ratings;
