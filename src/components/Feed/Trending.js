import React, { useEffect } from "react";
import { connect } from "react-redux";
// import components
import VideoList from "../VideoList/VideoList";
// import actions / reducers / sagas
import * as videoActions from "../../store/actions/videos";
import * as watchActions from '../../store/actions/watch';
import { selector_youtubeLibraryLoaded } from "../../store/reducers/session";
import {
	selector_mostPopularLoaded,
	selector_mostPopularVideos,
	selector_mostPopularNPT,
} from "../../store/reducers/videos";

const Trending = props => {
	// effect fetches mostPopular vids on page/site refresh
	useEffect(() => {
		if (props.youtubeLibraryLoaded) {
			props.fetchMostPopular(20, true);
		}
	}, [props.youtubeLibraryLoaded]);
	// effect checks all mostPopular items for detailed info and fetches missing info
	useEffect(() => {
		props.mostPopular.forEach(item => {
			if (!item.contentDetails || !item.statistics) {
				props.fetchWatchDetails(item.id);
			}
		});
	}, []);

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
	fetchWatchDetails: watchActions.action_fetchWatchDetails.request,
};

export default connect(
	mapStateToProps,
	actionCreators,
)(Trending);
