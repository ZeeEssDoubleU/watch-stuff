import React, { useEffect } from "react";
import { connect } from "react-redux";

// import components
import HomeContent from "./HomeContent";

// import actions / reducers / sagas
import * as videoActions from "../../store/actions/videos";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/session";
import {
	selector_categories,
	selector_categoriesLoaded,
	selector_mostPopularLoaded,
	selector_videosByCategoryLoaded,
} from "../../store/reducers/videos";

const Home = props => {
	// effect loads trending videos to state
	useEffect(() => {
		if (props.youtubeLibraryLoaded && !props.mostPopularLoaded) {
			props.fetchMostPopular();
		}
	}, [props.youtubeLibraryLoaded, props.mostPopularLoaded]);
	// effect loads video ids
	useEffect(() => {
		if (props.youtubeLibraryLoaded && !props.categoriesLoaded) {
			props.fetchCategories();
		}
	}, [props.youtubeLibraryLoaded, props.CategoriesLoaded]);

	useEffect(() => {
		if (props.categoriesLoaded && !props.byCategoryLoaded) {
			props.fetchMostPopularByCategory(props.categories);
		}
	}, [props.categories]);

	return <HomeContent />;
};

const mapStateToProps = state => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
	categories: selector_categories(state),
	categoriesLoaded: selector_categoriesLoaded(state),
	mostPopularLoaded: selector_mostPopularLoaded(state),
	byCategoryLoaded: selector_videosByCategoryLoaded(state),
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
