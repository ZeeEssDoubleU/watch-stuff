import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import "./RelatedVideos.scss";
import NextUpVideo from "./NextUpVideo/NextUpVideo";
import VideoPreview from "../VideoPreview/VideoPreview";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

import * as watchActions from "../../store/actions/watch";
import {
	selector_relatedVidsNextPageToken,
	selector_relatedVidsLoaded,
} from "../../store/reducers/videos";

const RelatedVideos = props => {
	// initialize .remaining-videos elem state and variables to determine remaining videos infinite scroll height
	const [remainingVidsHeight, setremainingVidsHeight] = useState(0);
	const remainingVidsElem = document.querySelector(".remaining-videos");
	const remainingVidsElemHeight = remainingVidsElem
		? window.innerHeight - remainingVidsElem.offsetTop
		: window.innerHeight;
	useEffect(() => {
		setremainingVidsHeight(remainingVidsElemHeight);
	}, [remainingVidsElemHeight]);

	// if no related videos available, return empty div
	if (!props.videos || props.videos.length === 0)
		return <div className="related-videos" />;

	// fetchMoreVideos & shouldShowLoader functions used in InfiniteScroll
	const fetchMoreVideos = () => {
		if (props.relatedNextPageToken && props.relatedLoaded) {
			props.fetchRelatedVideos(
				props.match.params.videoId,
				props.relatedNextPageToken,
				5,
			);
		}
	};
	const shouldShowLoader = () => {
		return props.relatedNextPageToken ? true : false;
	};

	const nextUpVideo = props.videos[0];
	const remainingVideos = props.videos.slice(1);
	const relatedPreviews = remainingVideos.map(video => {
		return video ? (
			<VideoPreview horizontal={true} video={video} key={video.id} />
		) : null;
	});

	return (
		<div className="related-videos">
			<NextUpVideo video={nextUpVideo} />
			<div
				className="remaining-videos"
				style={{ height: remainingVidsHeight }}>
				<InfiniteScroll
					bottomReachedCallback={() => fetchMoreVideos()}
					showLoader={shouldShowLoader()}>
					{relatedPreviews}
				</InfiniteScroll>
			</div>
		</div>
	);
};

RelatedVideos.propTypes = {};

const mapStateToProps = (state, props) => ({
	relatedNextPageToken: selector_relatedVidsNextPageToken(
		state,
		props.match.params.videoId,
	),
	relatedLoaded: selector_relatedVidsLoaded(state, props.match.params.videoId),
});

const actionCreators = {
	fetchRelatedVideos: watchActions.action_fetchRelatedVideos.request,
};

export default withRouter(
	connect(
		mapStateToProps,
		actionCreators,
	)(RelatedVideos),
);
