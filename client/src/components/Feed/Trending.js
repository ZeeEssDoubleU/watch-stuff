import React, { useEffect } from "react";
import { connect } from "react-redux";

import VideoList from "../VideoList/VideoList";

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
		if (props.mostPopularNPT && props.mostPopularLoaded) {
			props.fetchMostPopular(10, true, props.mostPopularNPT);
		}
	};
	const shouldShowLoader = () => {
		return props.mostPopularNPT ? true : false;
	};

	return (
		<VideoList
			bottomReachedCallback={() => fetchMoreVideos()}
			showLoader={shouldShowLoader()}
			videos={props.mostPopular}
		/>
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
