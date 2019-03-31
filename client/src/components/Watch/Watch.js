import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./Watch.scss";
import Video from "../Video/Video";
import RelatedVideos from "../RelatedVideos/RelatedVideos";
import VideoInfo from "../Video/VideoInfo";
import VideoMetadata from "../Video/VideoMetadata";
import Comments from "../Comments/Comments";

import * as watchActions from "../../store/actions/watch";
import {
	selector_savedVideoIdsCache,
	selector_subscriptions,
} from "../../store/reducers/user";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/session";
import { selector_videoById } from "../../store/reducers/videos";
import {
	selector_relatedVideos,
	selector_relatedVideosNPT,
} from "../../store/reducers/watch";
import { selector_channelDetails } from "../../store/reducers/channels";
import {
	selector_commentsByVideo,
	selector_commentsCount,
	selector_commentsNPT,
} from "../../store/reducers/comments";

const Watch = props => {
	const { pathname } = props.location;
	const { videoId } = props.match.params;
	useEffect(() => {
		if (props.youtubeLibraryLoaded) {
			props.fetchWatchDetails(videoId);
			props.updateWatchHistory(videoId);
			props.fetchRelatedVideos(videoId, props.relatedNPT, 5);
			props.fetchComments(videoId, props.commentsNPT, 5);
		}
	}, [props.youtubeLibraryLoaded, videoId]);

	return (
		<div className="watch-grid">
			<Video id={videoId} className="video-container" />
			<VideoMetadata
				className="video-metadata"
				pathname={pathname}
				video={props.video}
				saveVideo={props.saveVideo}
				savedVideos={props.savedVideos}
			/>
			<VideoInfo
				className="video-info-container"
				video={props.video}
				channel={props.channel}
				subscribe={props.subscribe}
				subscriptions={props.subscriptions}
			/>
			<Comments
				className="comments-container"
				comments={props.comments}
				commentsCount={props.commentsCount}
				fetchComments={props.fetchComments}
				videoId={videoId}
			/>
			<RelatedVideos
				className="related-vids"
				videos={props.relatedVideos}
				fetchRelatedVideos={props.fetchRelatedVideos}
				videoId={videoId}
			/>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
	video: selector_videoById(state, props.match.params.videoId),
	relatedVideos: selector_relatedVideos(state),
	relatedNPT: selector_relatedVideosNPT(state),
	channel: selector_channelDetails(state, props.match.params.videoId),
	comments: selector_commentsByVideo(state, props.match.params.videoId),
	commentsCount: selector_commentsCount(state, props.match.params.videoId),
	commentsNPT: selector_commentsNPT(state, props.match.params.videoId),
	savedVideos: selector_savedVideoIdsCache(state),
	subscriptions: selector_subscriptions(state),
});

const actionCreators = {
	fetchWatchDetails: watchActions.action_fetchWatchDetails.request,
	updateWatchHistory: watchActions.action_updateWatchHistory,
	fetchRelatedVideos: watchActions.action_fetchRelatedVideos.request,
	fetchComments: watchActions.action_fetchComments.request,
	saveVideo: watchActions.action_saveVideo,
	subscribe: watchActions.action_subscribe,
};

export default withRouter(
	connect(
		mapStateToProps,
		actionCreators,
	)(Watch),
);
