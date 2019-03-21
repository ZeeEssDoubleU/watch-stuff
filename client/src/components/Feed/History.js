import React from "react";
import { connect } from "react-redux";

import VideoList from "../VideoList/VideoList";

import { selector_watchHistory } from "../../store/reducers/watch";

const History = props => {
	return (
		<VideoList
			videos={props.watchHistory}
		/>
	);
};

const mapStateToProps = state => ({
	watchHistory: selector_watchHistory(state),
});

const actionCreators = {};

export default connect(
	mapStateToProps,
	actionCreators,
)(History);
