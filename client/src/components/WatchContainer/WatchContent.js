import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import "./WatchContent.scss";
import Video from "../Video/Video";
import RelatedVideos from "../RelatedVideos/RelatedVideos";
import VideoInfo from "../Video/VideoInfo";
import VideoMetadata from "../Video/VIdeoMetadata";
import CommentsContainer from "../CommentsContainer/CommentsContainer";

import * as watchActions from "../../store/actions/watch";
import {
	selector_videoById,
	selector_relatedVideos,
} from "../../store/reducers/videos";

class WatchContent extends Component {
	render() {
		return (
			<div className="watch-grid">
				<Video
					id={this.props.match.params.videoId}
					className="video-container"
				/>
				<VideoMetadata
					className="video-metadata"
					video={this.props.video}
				/>
				<VideoInfo
					className="video-info-container"
					video={this.props.video}
				/>
				<CommentsContainer className="comments-container" />
				<RelatedVideos
					className="related-videos"
					videos={this.props.relatedVideos}
				/>
			</div>
		);
	}
}

WatchContent.propTypes = {};

const mapStateToProps = (state, props) => ({
	video: selector_videoById(state, props.match.params.videoId),
	relatedVideos: selector_relatedVideos(state, props.match.params.videoId),
});

const actionCreators = {
	fetchWatchDetails: watchActions.action_fetchWatchDetails.request,
};

export default withRouter(
	connect(
		mapStateToProps,
		actionCreators,
	)(WatchContent),
);
