
import React from "react";
import PropTypes from "prop-types";

import "./RelatedVideos.scss";
import NextUpVideo from "./NextUpVideo/NextUpVideo.js";
import VideoPreview from "../../VideoPreview/VideoPreview.js";

const RelatedVideo = props => {
	return (
		<div className="related-videos">
         <NextUpVideo />
			<VideoPreview horizontal={true} />
			<VideoPreview horizontal={true} />
			<VideoPreview horizontal={true} />
		</div>
	);
};

RelatedVideo.propTypes = {};

export default RelatedVideo;
