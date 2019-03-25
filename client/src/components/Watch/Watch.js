import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./Watch.scss";
import Video from "../Video/Video";
import RelatedVideos from "../RelatedVideos/RelatedVideos";
import VideoInfo from "../Video/VideoInfo";
import VideoMetadata from "../Video/VIdeoMetadata";
import Comments from "../Comments/Comments";

import * as watchActions from "../../store/actions/watch";
import * as userActions from "../../store/actions/user";
import {
	selector_youtubeLibraryLoaded,
	selector_savedVideoIdsCache,
} from "../../store/reducers/user";
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
	const { videoId } = props.match.params;
	const { pathname } = props.location;
	useEffect(() => {
		if (props.youtubeLibraryLoaded) {
			props.fetchWatchDetails(videoId);
			props.fetchRelatedVideos(videoId, props.relatedNPT, 5);
			props.fetchComments(videoId, props.commentsNPT, 5);
		}
	}, [props.youtubeLibraryLoaded, videoId]);

	return (
		<div className="watch-grid">
			<Video id={videoId} className="video-container" />
			<VideoMetadata
				className="video-metadata"
				video={props.video}
				saveVideo={props.saveVideo}
				savedVidCache={props.savedVidCache}
				pathname={pathname}
			/>
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
	relatedVideos: selector_relatedVideos(state, props.match.params.videoId),
	relatedNPT: selector_relatedVideosNPT(state, props.match.params.videoId),
	channel: selector_channelDetails(state, props.match.params.videoId),
	comments: selector_commentsByVideo(state, props.match.params.videoId),
	commentsCount: selector_commentsCount(state, props.match.params.videoId),
	commentsNPT: selector_commentsNPT(state, props.match.params.videoId),
	savedVidCache: selector_savedVideoIdsCache(state),
});

const actionCreators = {
	fetchWatchDetails: watchActions.action_fetchWatchDetails.request,
	fetchRelatedVideos: watchActions.action_fetchRelatedVideos.request,
	fetchComments: watchActions.action_fetchComments.request,
	saveVideo: watchActions.action_saveVideo,
};

export default withRouter(
	connect(
		mapStateToProps,
		actionCreators,
	)(Watch),
);
