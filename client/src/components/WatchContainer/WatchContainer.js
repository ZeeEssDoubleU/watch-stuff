import React, { Component } from "react";
import PropTypes from "prop-types";

import "./WatchContainer.scss";
import Video from "../Video/Video";
import RelatedVideos from "./RelatedVideos/RelatedVideos";
import VideoInfo from "./VideoInfo/VideoInfo";
import VideoMetadata from "./VideoMetadata/VIdeoMetadata";
import CommentsContainer from "./CommentsContainer/CommentsContainer";

class WatchContainer extends Component {
	render() {
		return (
			<div className="WatchContainer-grid">
				<Video id="vDjcWlCT8rg" className="video-container" />
				<VideoMetadata className="video-metadata" viewCount={1000} />
				<VideoInfo className='video-info-container'/>
				<CommentsContainer className='comments'/>
				<RelatedVideos className="related-videos" />
			</div>
		);
	}
}

WatchContainer.propTypes = {};

export default WatchContainer;

// video container
//// video
//// video metadata
//// video info

// comments container
//// total/sort comments
//// add comment
//// comment list
////// comment container
//////// comment
//////// comment info
//////// replies

// up next sidebar (right)
// view preview container
// video thumbnail
// video info
