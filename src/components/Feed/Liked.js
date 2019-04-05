import React, { useEffect } from "react";
import { connect } from "react-redux";
// import components
import VideoList from "../VideoList/VideoList";
// import actions / reducers / sagas
import * as watchActions from "../../store/actions/watch";
import {
	selector_likedVideoIds,
	selector_likedVideosLoaded,
	selector_likedVideos,
} from "../../store/reducers/user";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/session";

const Liked = props => {
	// effect checks all liked videos for detailed info and fetches missing info
	useEffect(() => {
		if (props.youtubeLibraryLoaded && props.likedVideosLoaded) {
			props.likedVideos.forEach(item => {
				if (!item.contentDetails || !item.statistics) {
					props.fetchWatchDetails(item.id);
				}
			});
		} else if (props.youtubeLibraryLoaded && !props.likedVideosLoaded) {
			props.likedVideoIds.forEach(item => {
				props.fetchWatchDetails(item.id);
			});
		}
	}, [props.youtubeLibraryLoaded]);

	return <VideoList videos={props.likedVideos} />;
};

const mapStateToProps = state => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
	likedVideoIds: selector_likedVideoIds(state),
	likedVideosLoaded: selector_likedVideosLoaded(state),
	likedVideos: selector_likedVideos(state),
});

const actionCreators = {
	fetchWatchDetails: watchActions.action_fetchWatchDetails.request,
};

export default connect(
	mapStateToProps,
	actionCreators,
)(Liked);
