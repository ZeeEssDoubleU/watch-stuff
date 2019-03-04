import React, { Component } from "react";
import { connect } from "react-redux";

import HomeContent from "./HomeContent";
import SideBarContainer from "../SideBarContainer/SideBarContainer";

import * as videoActions from "../../store/actions/videos";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/api";
import {
	selector_videoCategories,
	selector_videoCategoriesLoaded,
} from "../../store/reducers/videos";

class HomeContainer extends Component {
	// Most likely won't fetch.  Meant to fetch if client library has already been loaded (ie navigating back from other page)
	componentDidMount() {
		if (this.props.youtubeLibraryLoaded) {
			this.props.fetchMostPopular();
			this.props.fetchCategories();
		}
	}

	// Most likely will fetch.  Client library usually loads after component mounts
	componentDidUpdate(prevProps) {
		if (this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
			this.props.fetchMostPopular();
			this.props.fetchCategories();
		}
		if (
			this.props.categories !== prevProps.categories &&
			this.props.categoriesLoaded
		) {
			this.props.fetchMostPopularByCategory(this.props.categories);
		}
	}

	render() {
		return (
			<>
				<SideBarContainer />
				<HomeContent />
			</>
		);
	}
}

const mapStateToProps = state => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
	categories: selector_videoCategories(state),
	categoriesLoaded: selector_videoCategoriesLoaded(state),
});

// action creators
const actionCreators = {
	fetchMostPopular: videoActions.action_fetchMostPopular.request,
	fetchCategories: videoActions.action_fetchCategory.request,
	fetchMostPopularByCategory:
		videoActions.action_fetchMostPopularByCategory.request,
};

export default connect(
	mapStateToProps,
	actionCreators,
)(HomeContainer);
