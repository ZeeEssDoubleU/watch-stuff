import React, { useEffect } from "react";
import { connect } from "react-redux";
// import components
import VideoList from "../VideoList/VideoList";
// import actions / reducers / sagas
import * as watchActions from "../../store/actions/watch";
import {
	selector_watchHistoryIds,
	selector_watchHistoryLoaded,
	selector_watchHistoryVideos,
} from "../../store/reducers/user";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/session";

const History = props => {
	// effect checks all history items for detailed info and fetches missing info
	useEffect(() => {
		if (props.youtubeLibraryLoaded && props.watchHistoryLoaded) {
			props.watchHistoryVideos.forEach(item => {
				if (!item.contentDetails || !item.statistics) {
					props.fetchWatchDetails(item.id);
				}
			});
		} else if (props.youtubeLibraryLoaded && !props.watchHistoryLoaded) {
			props.watchHistoryIds.forEach(item => {
				props.fetchWatchDetails(item.videoId);
			});
		}
	}, [props.youtubeLibraryLoaded]);

	return <VideoList videos={props.watchHistoryVideos} />;
};

const mapStateToProps = state => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
	watchHistoryIds: selector_watchHistoryIds(state),
	watchHistoryLoaded: selector_watchHistoryLoaded(state),
	watchHistoryVideos: selector_watchHistoryVideos(state),
});

const actionCreators = {
	fetchWatchDetails: watchActions.action_fetchWatchDetails.request,
};

export default connect(
	mapStateToProps,
	actionCreators,
)(History);
