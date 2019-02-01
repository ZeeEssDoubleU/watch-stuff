import React, { Component } from "react";
import PropTypes from "prop-types";
import { Divider } from "semantic-ui-react";

import "./VideoInfo.scss";

class VideoInfo extends Component {
	render() {
		return (
			<div className="video-info">
				Video Info here.
				<Divider />
			</div>
		);
	}
}

VideoInfo.propTypes = {};

export default VideoInfo;
