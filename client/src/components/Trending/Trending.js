import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./Trending.scss";
import VideoPreview from "../../components/VideoPreview/VideoPreview";
import SideBar from "../SideBar/SideBar";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

import * as videoActions from "../../store/actions/videos";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/api";
import {
	selector_mostPopularLoaded,
	selector_mostPopularVideos,
	selector_mostPopularNPT,
} from "../../store/reducers/videos";

const Trending = props => {
	useEffect(() => {
		if (props.youtubeLibraryLoaded && !props.mostPopularLoaded) {
			props.fetchMostPopular(20, true);
		}
	}, [props.youtubeLibraryLoaded]);

	// fetchMoreVideos & shouldShowLoader functions used in InfiniteScroll
	const fetchMoreVideos = () => {
		if (props.mostPopularNPT) {
			props.fetchMostPopular(5, true, props.mostPopularNPT);
		}
	};
	const shouldShowLoader = () => {
		return props.mostPopularNPT ? true : false;
	};

	const videoPreviews = props.mostPopular
		? props.mostPopular.map(video => (
				<VideoPreview
					horizontal={true}
					expanded={true}
					video={video}
					key={video.id}
				/>
		  ))
		: null;

	return (
		<>
			<SideBar />
			<div className="trending">
				<div className="responsive-video-grid-container">
					<InfiniteScroll
						bottomReachedCallback={() => fetchMoreVideos()}
						showLoader={shouldShowLoader()}>
						{videoPreviews}
					</InfiniteScroll>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = state => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
	mostPopularLoaded: selector_mostPopularLoaded(state),
	mostPopular: selector_mostPopularVideos(state),
	mostPopularNPT: selector_mostPopularNPT(state),
});

const actionCreators = {
	fetchMostPopular: videoActions.action_fetchMostPopular.request,
};

export default connect(
	mapStateToProps,
	actionCreators,
)(Trending);
