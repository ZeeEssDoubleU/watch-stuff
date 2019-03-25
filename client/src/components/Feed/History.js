import React, { useEffect } from "react";
import { connect } from "react-redux";
// import components
import VideoList from "../VideoList/VideoList";
// import actions / reducers / sagas
import * as watchActions from "../../store/actions/watch";
import { selector_watchHistory } from "../../store/reducers/user";

const History = props => {
	// effect checks all history items for detailed info and fetches missing info
	useEffect(() => {
		props.watchHistory.forEach(item => {
			if (item.contentDetails || !item.statistics) {
				props.fetchWatchDetails(item.id);
			}
		});
	}, []);

	return <VideoList videos={props.watchHistory} />;
};

const mapStateToProps = state => ({
	watch: selector_watchHistory(state),
});

const actionCreators = {
	fetchWatchDetails: watchActions.action_fetchWatchDetails.request,
};

export default connect(
	mapStateToProps,
	actionCreators,
)(History);
