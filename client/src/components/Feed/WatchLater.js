import React, { useEffect } from "react";
import { connect } from "react-redux";
// import components
import VideoList from "../VideoList/VideoList";
// import actions / reducers / sagas
import * as watchActions from "../../store/actions/watch";
import {
	selector_savedVideoIdsOrder,
	selector_savedVideos,
	selector_savedVideosLoaded,
} from "../../store/reducers/user";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/session";

const WatchLater = props => {
	console.group();
	console.log("API LOADED", props.youtubeLibraryLoaded);
	console.log("SAVED VIDS LOADED", props.savedVideosLoaded);
	console.log("SAVED VIDS", props.savedVideos);
	console.log("SAVED VID IDS ORDER", props.savedVideoIdsOrder);
	console.groupEnd();

	// TODO - FIX HISTORY COMPONENT TO PROPERLY LOAD LOCAL STORAGE
	// TODO - FIX LIKED COMPONENT TO PROPERLY LOAD LOCAL STORAGE

	// effect checks all saved videos for detailed info and fetches missing info
	useEffect(() => {
		if (props.youtubeLibraryLoaded && props.savedVideosLoaded) {
			props.savedVideos.forEach(item => {
				console.log("ITEM IDS - LOADED:", item.id);
				if (!item.contentDetails || !item.statistics) {
					props.fetchWatchDetails(item.id);
				}
			});
		}
	}, [props.youtubeLibraryLoaded]);
	useEffect(() => {
		if (props.youtubeLibraryLoaded && !props.savedVideosLoaded) {
			props.savedVideoIdsOrder.forEach(item => {
				console.log("ITEM IDS - NOT LOADED:", item.videoId);
				props.fetchWatchDetails(item.videoId);
			});
		}
	}, [props.youtubeLibraryLoaded]);

	return <VideoList videos={props.savedVideos} />;
};

const mapStateToProps = state => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
	savedVideoIdsOrder: selector_savedVideoIdsOrder(state),
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
