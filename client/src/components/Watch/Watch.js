import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Watch.scss";
import Video from "../Video/Video.js";
import RelatedVideos from "./RelatedVideos/RelatedVideos.js";

class Watch extends Component {
	render() {
		return (
			<div className="watch-grid">
				<Video id="vDjcWlCT8rg" className="video-container" />
				<div className="metadata">Metadata here.</div>
				<div className="video-info">Video info here.</div>
				<div className="comments">Comments here.</div>
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
