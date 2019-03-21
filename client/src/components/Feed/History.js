import React, { useEffect } from "react";
import { connect } from "react-redux";

import VideoList from "../VideoList/VideoList";

import { selector_watchHistory } from "../../store/reducers/watch";
import * as watchActions from "../../store/actions/watch";

const History = props => {
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
	watchHistory: selector_watchHistory(state),
});

const actionCreators = {
	fetchWatchDetails: watchActions.action_fetchWatchDetails.request,
};

export default connect(
	mapStateToProps,
	actionCreators,
)(History);
