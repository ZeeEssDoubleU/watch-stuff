import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import WatchContent from "./WatchContent";

import * as watchActions from "../../store/actions/watch";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/api";

class WatchContainer extends Component {
	componentDidMount() {
		if (this.props.youtubeLibraryLoaded) {
			this.props.fetchWatchDetails(this.props.match.params.videoId);
		}
	}
	componentDidUpdate(prevState) {
		if (this.props.youtubeLibraryLoaded !== prevState.youtubeLibraryLoaded) {
			this.props.fetchWatchDetails(this.props.match.params.videoId);
		}
	}
	render() {
		return <WatchContent />;
	}
}

WatchContainer.propTypes = {};

const mapStateToProps = state => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
});

const actionCreators = {
	fetchWatchDetails: watchActions.action_fetchWatchDetails.request,
};

export default withRouter(
	connect(
		mapStateToProps,
		actionCreators,
	)(WatchContainer),
);
