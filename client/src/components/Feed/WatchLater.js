import React, { useEffect } from "react";
import { connect } from "react-redux";
// import components
import VideoList from "../VideoList/VideoList";
// import actions / reducers / sagas
import * as watchActions from "../../store/actions/watch";
import { selector_savedVideos } from "../../store/reducers/user";

const WatchLater = props => {
	// effect checks all saved videos for detailed info and fetches missing info
	useEffect(() => {
		props.savedVideos.forEach(item => {
			if (!item.contentDetails || !item.statistics) {
				props.fetchWatchDetails(item.id);
			}
		});
	}, []);

	return <VideoList videos={props.savedVideos} />;
};

const mapStateToProps = state => ({
	savedVideos: selector_savedVideos(state),
});

const actionCreators = {
	fetchWatchDetails: watchActions.action_fetchWatchDetails.request,
};

export default connect(
	mapStateToProps,
	actionCreators,
)(WatchLater);
