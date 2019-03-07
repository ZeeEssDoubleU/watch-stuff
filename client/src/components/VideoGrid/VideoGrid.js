import React from "react";
import PropTypes from "prop-types";
import { Divider } from "semantic-ui-react";

import "./VideoGrid.scss";
import VideoGridHeader from "./VideoGridHeader";
import VideoPreview from "../VideoPreview/VideoPreview";

const VideoGrid = props => {
	if (!props.videos || !props.videos.length) return <div />;

	const gridItems = props.videos.map(video => {
		return <VideoPreview video={video} key={video.id} />;
	});

	const divider = props.hideDivider ? null : <Divider />;
	return (
		<div className="video-section-container">
			<div className="video-section">
				<VideoGridHeader title={props.title} />
				<div className="video-grid">{gridItems}</div>
				{divider}
			</div>
		</div>
	);
};

VideoGrid.propTypes = {};

export default VideoGrid;
