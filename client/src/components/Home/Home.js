import React, { useEffect } from "react";
import { connect } from "react-redux";

import HomeContent from "./HomeContent";
import SideBar from "../SideBar/SideBar";

import * as videoActions from "../../store/actions/videos";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/api";
import {
	selector_videoCategories,
	selector_videoCategoriesLoaded,
} from "../../store/reducers/videos";

const Home = props => {
	useEffect(() => {
		if (props.youtubeLibraryLoaded) {
			props.fetchMostPopular();
			props.fetchCategories();
		}
	}, [props.youtubeLibraryLoaded]);

	useEffect(() => {
		if (props.categoriesLoaded) {
			props.fetchMostPopularByCategory(props.categories);
		}
	}, [props.categories]);

	return (
		<>
			<SideBar />
			<HomeContent />
		</>
	);
};

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
)(Home);
