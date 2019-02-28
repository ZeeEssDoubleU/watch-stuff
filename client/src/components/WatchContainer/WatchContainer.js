import React, { Component } from "react";
import PropTypes from "prop-types";

import "./WatchContainer.scss";
import Video from "../Video/Video";
import RelatedVideos from "../RelatedVideos/RelatedVideos";
import VideoInfo from "../Video/VideoInfo";
import VideoMetadata from "../Video/VIdeoMetadata";
import CommentsContainer from "../CommentsContainer/CommentsContainer";

class WatchContainer extends Component {
	render() {
		return (
			<div className="watch-container">
				<Video id="vDjcWlCT8rg" className="video-container" />
				<VideoMetadata className="video-metadata" viewCount={1000} />
				<VideoInfo className='video-info-container'/>
				<CommentsContainer className='comments-container'/>
				<RelatedVideos className="related-videos" />
			</div>
		);
	}
}

WatchContainer.propTypes = {};

export default WatchContainer;