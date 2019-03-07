import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Image } from "semantic-ui-react";
import { getFormattedDate } from "../../utils/format-time";
import Linkify from "react-linkify";

import "./VideoInfo.scss";

const VideoInfo = props => {
	const [collapsed, toggleCollapse] = useState(true);

	if (!props.video) return <div />;

	const channelName = props.video.snippet.channelTitle;
	const publishDate = getFormattedDate(props.video.snippet.publishedAt);
	const description = props.video.snippet.description;

	return (
		<div className="video-info-container">
			<Image
				className="channel-image"
				src="http://via.placeholder.com/48x48"
				circular
			/>
			<div className="video-info">
				<div className="channel-name">{channelName}</div>
				<div className="videopublication-date">
					Published on {publishDate}
				</div>
			</div>
			<Button className="subscribe-button" color="youtube">
				SUBSCRIBE 523K
			</Button>
			<div className="video-description">
				<div className={collapsed ? "collapsed" : "expanded"}>
					<Linkify>{description}</Linkify>
				</div>
				<Button
					className="show-more-button"
					compact
					onClick={() => toggleCollapse(!collapsed)}>
					{collapsed ? "SHOW MORE" : "SHOW LESS"}
				</Button>
			</div>
		</div>
	);
};

VideoInfo.propTypes = {};

export default VideoInfo;
