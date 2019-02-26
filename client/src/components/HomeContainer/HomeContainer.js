import React, { Component } from "react";
import { connect } from "react-redux";

import "./HomeContainer.scss";
import HomeContent from "./HomeContent";
import SideBarContainer from "../SideBarContainer/SideBarContainer";

import * as videoActions from "../../store/actions/videos";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/api";
import { selector_videoCategories } from "../../store/reducers/videos";

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
			this.props.fetchVideoCategories();
			if (this.props.videoCategories.length > 0) {
				this.props.fetchMostPopularVideosByCategory(
					this.props.videoCategories,
				);
			}
		}
	}

	// Most likely will fetch.  Client library usually loads after component mounts
	componentDidUpdate(prevProps) {
		if (this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
			this.props.fetchMostPopularVideos();
			this.props.fetchVideoCategories();
		}
		if (
			this.props.videoCategories !== prevProps.videoCategories &&
			this.props.videoCategories.length > 0
		) {
			this.props.fetchMostPopularVideosByCategory(
				this.props.videoCategories,
			);
		}
	}
}

const mapStateToProps = state => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
	videoCategories: selector_videoCategories(state),
});

// action creators
const actionCreators = {
	fetchMostPopularVideos: videoActions.action_fetchMostPopular.request,
	fetchVideoCategories: videoActions.action_fetchCategory.request,
	fetchMostPopularVideosByCategory:
		videoActions.action_fetchMostPopularByCategory.request,
};

HomeContainer = connect(
	mapStateToProps,
	actionCreators,
)(HomeContainer);

export default HomeContainer;
