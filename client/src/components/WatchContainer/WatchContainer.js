import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import "./WatchContainer.scss";
import Video from "../Video/Video";
import RelatedVideos from "../RelatedVideos/RelatedVideos";
import VideoInfo from "../Video/VideoInfo";
import VideoMetadata from "../Video/VIdeoMetadata";
import CommentsContainer from "../CommentsContainer/CommentsContainer";

import * as videoActions from "../../store/actions/videos";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/api";

class WatchContainer extends Component {
	componentDidMount() {
		if (this.props.youtubeLibraryLoaded) {
			this.props.fetchWatchDetails(this.props.match.params.videoId);
		}
	}
	componentDidUpdate(prevState) {
		if (this.props.youtubeLibraryLoaded !== prevState.youtubeLibraryLoaded) {
			this.props.fetchWatchDetails(this.props.match.params.videoId);
		}
	}
	render() {
		return (
			<div className="watch-container">
				<Video
					id={this.props.match.params.videoId}
					className="video-container"
				/>
				<VideoMetadata className="video-metadata" viewCount={1000} />
				<VideoInfo className="video-info-container" />
				<CommentsContainer className="comments-container" />
				<RelatedVideos className="related-videos" />
			</div>
		);
	}
}

WatchContainer.propTypes = {};

const mapStateToProps = state => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
});

const actionCreators = {
	fetchWatchDetails: videoActions.action_fetchWatchDetails.request,
};

export default withRouter(
	connect(
		mapStateToProps,
		actionCreators,
	)(WatchContainer),
);
