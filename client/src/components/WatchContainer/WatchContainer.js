import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import WatchContent from "./WatchContent";

import * as watchActions from "../../store/actions/watch";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/api";

const WatchContainer = props => {
	useEffect(() => {
		if (props.youtubeLibraryLoaded) {
			props.fetchWatchDetails(props.match.params.videoId);
			props.fetchRelatedVideos(props.match.params.videoId);
		}
	});

	return <WatchContent />;
};

WatchContainer.propTypes = {};

const mapStateToProps = state => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
});

const actionCreators = {
	fetchWatchDetails: watchActions.action_fetchWatchDetails.request,
	fetchRelatedVideos: watchActions.action_fetchRelatedVideos.request,
};

export default withRouter(
	connect(
		mapStateToProps,
		actionCreators,
	)(WatchContainer),
);
