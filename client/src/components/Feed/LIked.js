import React, { useEffect } from "react";
import { connect } from "react-redux";
// import components
import VideoList from "../VideoList/VideoList";
// import actions / reducers / sagas
import * as watchActions from "../../store/actions/watch";
import { selector_likedVideos } from "../../store/reducers/user";

const Liked = props => {
	// effect checks all liked videos for detailed info and fetches missing info
	useEffect(() => {
		props.likedVideos.forEach(item => {
			if (!item.contentDetails || !item.statistics) {
				props.fetchWatchDetails(item.id);
			}
		});
	}, []);

	return <VideoList videos={props.likedVideos} />;
};

const mapStateToProps = state => ({
	likedVideos: selector_likedVideos(state),
});

const actionCreators = {
	fetchWatchDetails: watchActions.action_fetchWatchDetails.request,
};

export default connect(
	mapStateToProps,
	actionCreators,
)(Liked);
