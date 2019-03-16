import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import "./Watch.scss";
import Video from "../Video/Video";
import RelatedVideos from "../RelatedVideos/RelatedVideos";
import VideoInfo from "../Video/VideoInfo";
import VideoMetadata from "../Video/VIdeoMetadata";
import Comments from "../Comments/Comments";

import * as watchActions from "../../store/actions/watch";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/api";
import {
	selector_videoById,
	selector_relatedVideos,
	selector_relatedVideosNPT,
} from "../../store/reducers/videos";
import { selector_channelDetails } from "../../store/reducers/channels";
import {
	selector_commentsByVideo,
	selector_commentsCount,
	selector_commentsNPT,
} from "../../store/reducers/comments";

const Watch = props => {
	useEffect(() => {
		if (props.youtubeLibraryLoaded) {
			props.fetchWatchDetails(props.match.params.videoId);
			props.fetchRelatedVideos(props.match.params.videoId, props.relatedNPT, 20);
			props.fetchComments(props.match.params.videoId, props.commentsNPT, 20);
		}
	}, [props.youtubeLibraryLoaded]);

	return (
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
				fetchComments={props.fetchComments}
				videoId={props.match.params.videoId}
			/>
			<RelatedVideos
				className="related-vids"
				videos={props.relatedVideos}
				fetchRelatedVideos={props.fetchRelatedVideos}
				videoId={props.match.params.videoId}
			/>
		</div>
	);
};

Watch.propTypes = {};

const mapStateToProps = (state, props) => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
	video: selector_videoById(state, props.match.params.videoId),
	relatedVideos: selector_relatedVideos(state, props.match.params.videoId),
	relatedNPT: selector_relatedVideosNPT(state, props.match.params.videoId),
	channel: selector_channelDetails(state, props.match.params.videoId),
	comments: selector_commentsByVideo(state, props.match.params.videoId),
	commentsCount: selector_commentsCount(state, props.match.params.videoId),
	commentsNPT: selector_commentsNPT(state, props.match.params.videoId),
});

const actionCreators = {
	fetchWatchDetails: watchActions.action_fetchWatchDetails.request,
	fetchRelatedVideos: watchActions.action_fetchRelatedVideos.request,
	fetchComments: watchActions.action_fetchComments.request,
};

export default withRouter(
	connect(
		mapStateToProps,
		actionCreators,
	)(Watch),
);
