import React from "react";
import PropTypes from "prop-types";
import { Divider } from "semantic-ui-react";

import "./VideoGrid.scss";
import VideoGridHeader from "./VideoGridHeader";
import VideoPreview from "../VideoPreview/VideoPreview";

const VideoGrid = props => {
	const divider = props.hideDivider ? null : <Divider />;
	return (
		<div className="video-section-container">
			<div className="video-section">
				<VideoGridHeader title={props.title} />
				<div className="video-grid">
					<VideoPreview />
					<VideoPreview />
					<VideoPreview />
					<VideoPreview />
					<VideoPreview />
					<VideoPreview />
					<VideoPreview />
					<VideoPreview />
					<VideoPreview />
					<VideoPreview />
					<VideoPreview />
					<VideoPreview />
				</div>
				{divider}
			</div>
		</div>
	);
};

VideoGrid.propTypes = {};

export default VideoGrid;
