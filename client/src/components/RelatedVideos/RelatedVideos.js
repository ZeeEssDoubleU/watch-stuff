import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./RelatedVideos.scss";
import NextUpVideo from "./NextUpVideo/NextUpVideo";
import VideoPreview from "../VideoPreview/VideoPreview";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

import {
	selector_relatedVideosNPT,
	selector_relatedVideosLoaded,
} from "../../store/reducers/watch";

const RelatedVideos = props => {
	// if no related videos available, return empty div
	if (!props.videos || props.videos.length === 0)
		return <div className="related-vids" />;

	// initialize .remaining-vids elem state and variables to determine remaining videos infinite scroll height
	const [remainingVideosHeight, setremainingVideosHeight] = useState(0);
	const remainingVideosElem = document.querySelector(".remaining-vids");
	const remainingVideosElemHeight = remainingVideosElem
		? window.innerHeight - remainingVideosElem.offsetTop
		: window.innerHeight;
	useEffect(() => {
		setremainingVideosHeight(remainingVideosElemHeight);
	}, [remainingVideosElemHeight]);

	// variables and effect to fetch more related videos based on visibilty of loader
	const loader = document.querySelector(".remaining-vids > .loader-container");
	const loaderOffset = loader ? loader.offsetTop : 0;
	const loaderVisible = loaderOffset < window.innerHeight;
	useEffect(() => {
		if (loaderVisible) {
			props.fetchRelatedVideos(props.videoId, props.relatedNPT, 5);
		}
	}, [loaderOffset]);

	// fetchMoreVideos functions used in InfiniteScroll
	const fetchMoreVideos = () => {
		if (props.relatedNPT && !loaderVisible) {
			props.fetchRelatedVideos(props.videoId, props.relatedNPT, 5);
		}
	};

	const nextUpVideo = props.videos[0];
	const remainingVideos = props.videos.slice(1);
	const relatedPreviews = remainingVideos.map(video => {
		return video ? (
			<VideoPreview horizontal={true} video={video} key={video.id} />
		) : null;
	});

	return (
		<div className="related-vids">
			<NextUpVideo video={nextUpVideo} />
			<div
				className="remaining-vids"
				style={{ height: remainingVideosHeight }}>
				<InfiniteScroll
					bottomReachedCallback={() => fetchMoreVideos()}
					showLoader={props.relatedNPT ? true : false}>
					{relatedPreviews}
				</InfiniteScroll>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	relatedNPT: selector_relatedVideosNPT(state, props.videoId),
	relatedLoaded: selector_relatedVideosLoaded(state, props.videoId),
});

export default withRouter(
	connect(
		mapStateToProps,
		null,
	)(RelatedVideos),
);
