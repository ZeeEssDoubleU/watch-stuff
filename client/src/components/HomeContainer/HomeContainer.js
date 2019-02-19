import React, { Component } from "react";
import { connect } from "react-redux";

import "./HomeContainer.scss";
import HomeContent from "./HomeContent";
import SideBarContainer from "../SideBarContainer/SideBarContainer";

import * as videoActions from "../../store/actions/videos";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";

class HomeContainer extends Component {
	render() {
		return (
			<>
				<SideBarContainer />
				<HomeContent />
			</>
		);
	}

	// Most likely won't fetch.  Meant to fetch if client library has already been loaded (ie navigating back from other page)
	componentDidMount() {
		if (this.props.youtubeLibraryLoaded) {
			this.props.fetchMostPopularVideos();
		}
	}

	// Most likely will fetch.  Client library usually loads after component mounts
	componentDidUpdate(prevProps) {
		if (this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
			this.props.fetchMostPopularVideos();
		}
	}
}

const mapStateToProps = state => ({
	youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
});

// action creators
const fetchMostPopularVideos = videoActions.fetchMostPopularVideos.request;

HomeContainer = connect(
	mapStateToProps,
	{ fetchMostPopularVideos },
)(HomeContainer);

export default HomeContainer;