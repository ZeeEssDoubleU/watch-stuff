import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import "./WatchContent.scss";
import Video from "../Video/Video";
import RelatedVideos from "../RelatedVideos/RelatedVideos";
import VideoInfo from "../Video/VideoInfo";
import VideoMetadata from "../Video/VIdeoMetadata";
import Comments from "../Comments/Comments";

import {
	selector_videoById,
	selector_relatedVideos,
} from "../../store/reducers/videos";
import { selector_channelDetails } from "../../store/reducers/channels";
import {
	selector_commentsByVideo,
	selector_commentsCount,
} from "../../store/reducers/comments";

const WatchContent = props => (
	<div className="watch-grid">
		<Video id={props.match.params.videoId} className="video-container" />
		<VideoMetadata className="video-metadata" video={props.video} />
		<VideoInfo
			className="video-info-container"
			video={props.video}
			channel={props.channel}
		/>
		<Comments
			className="comments-container"
			comments={props.comments}
			commentsCount={props.commentsCount}
		/>
		<RelatedVideos className="related-videos" videos={props.relatedVideos} />
	</div>
);

WatchContent.propTypes = {};

const mapStateToProps = (state, props) => ({
	video: selector_videoById(state, props.match.params.videoId),
	relatedVideos: selector_relatedVideos(state, props.match.params.videoId),
	channel: selector_channelDetails(state, props.match.params.videoId),
	comments: selector_commentsByVideo(state, props.match.params.videoId),
	commentsCount: selector_commentsCount(state, props.match.params.videoId),
});

export default withRouter(
	connect(
		mapStateToProps,
		null,
	)(WatchContent),
);
