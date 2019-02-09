import React from "react";
import PropTypes from "prop-types";

import "./VideogridHeader.scss";

const VideoGridHeader = props => {
	return (
		<div className="video-grid-header">
			<span className="title">{props.title}</span>
		</div>
	);
};

VideoGridHeader.propTypes = {};

export default VideoGridHeader;
