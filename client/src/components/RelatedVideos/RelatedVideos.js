import React from "react";
import PropTypes from "prop-types";

import "./RelatedVideos.scss";
import NextUpVideo from "./NextUpVideo/NextUpVideo";
import VideoPreview from "../VideoPreview/VideoPreview";

const RelatedVideos = props => {
	if (!props.videos || props.videos.length === 0)
		return <div className="related-videos" />;
		
	const nextUpVideo = props.videos[0];
	const remainingVideos = props.videos.slice(1);
	const relatedPreviews = remainingVideos.map(video => {
		return video 
			? <VideoPreview horizontal={true} video={video} key={video.id} />
			: null;
	});

	return (
		<div className="related-videos">
			<NextUpVideo video={nextUpVideo} />
			{relatedPreviews}
		</div>
	);
};

RelatedVideos.propTypes = {};

export default RelatedVideos;
