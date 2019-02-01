import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Watch.scss";
import Video from "../Video/Video";
import RelatedVideos from "./RelatedVideos/RelatedVideos";
import VideoInfo from "./VideoInfo/VideoInfo";
import VideoMetadata from "./VideoMetadata/VIdeoMetadata";
import Comments from "./Comments/Comments";

class Watch extends Component {
	render() {
		return (
			<div className="watch-grid">
				<Video id="vDjcWlCT8rg" className="video-container" />
				<VideoMetadata className="video-metadata" viewCount={1000} />
				<VideoInfo className='video-info'/>
				<Comments className='comments'/>
				<RelatedVideos className="related-videos" />
			</div>
		);
	}
}

Watch.propTypes = {};

export default Watch;

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
