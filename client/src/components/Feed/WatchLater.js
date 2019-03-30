import React, { useEffect } from "react";
import { connect } from "react-redux";
// import components
import VideoList from "../VideoList/VideoList";
// import actions / reducers / sagas
import * as watchActions from "../../store/actions/watch";
import {
	selector_savedVideoIds,
	selector_savedVideos,
	selector_savedVideosLoaded,
} from "../../store/reducers/user";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/session";

const WatchLater = props => {
	// TODO - FIX HISTORY COMPONENT TO PROPERLY LOAD LOCAL STORAGE
	// TODO - FIX LIKED COMPONENT TO PROPERLY LOAD LOCAL STORAGE

	// effect checks all saved videos for detailed info and fetches missing info
	useEffect(() => {
		if (props.youtubeLibraryLoaded && props.savedVideosLoaded) {
			props.savedVideos.forEach(item => {
				if (!item.contentDetails || !item.statistics) {
					props.fetchWatchDetails(item.id);
				}
			});
		} else if (props.youtubeLibraryLoaded && !props.savedVideosLoaded) {
			props.savedVideoIds.forEach(item => {
				props.fetchWatchDetails(item.videoId);
			});
		}
	}, [props.youtubeLibraryLoaded]);

	return <VideoList videos={props.savedVideos} />;
};

const mapStateToProps = state => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
	savedVideoIds: selector_savedVideoIds(state),
	savedVideos: selector_savedVideos(state),
	savedVideosLoaded: selector_savedVideosLoaded(state),
});

const actionCreators = {
	fetchWatchDetails: watchActions.action_fetchWatchDetails.request,
};

export default connect(
	mapStateToProps,
	actionCreators,
)(WatchLater);
