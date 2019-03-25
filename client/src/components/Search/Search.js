import React, { useEffect } from "react";
import { connect } from "react-redux";

import VideoList from "../VideoList/VideoList";

import * as searchActions from "../../store/actions/search";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/user";
import {
	selector_searchResultsLoaded,
	selector_searchResults,
	selector_searchNPT,
} from "../../store/reducers/search";

const Search = props => {
	const { query } = props.match.params;

	useEffect(() => {
		if (props.youtubeLibraryLoaded && !props.searchResultsLoaded) {
			props.fetchSearchVideos(query, null, 20);
		}
	}, [props.youtubeLibraryLoaded]);
   
	// fetchMoreVideos & shouldShowLoader functions used in InfiniteScroll
	const fetchMoreVideos = () => {
		if (props.searchNPT && props.searchResultsLoaded) {
			props.fetchSearchVideos(query, props.searchNPT, 10);
		}
	};
	const shouldShowLoader = () => {
		return props.searchNPT ? true : false;
	};

	return (
		<VideoList
			bottomReachedCallback={() => fetchMoreVideos()}
			showLoader={shouldShowLoader()}
			videos={props.searchResults}
		/>
	);
};

const mapStateToProps = state => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
	searchResultsLoaded: selector_searchResultsLoaded(state),
	searchResults: selector_searchResults(state),
	searchNPT: selector_searchNPT(state),
});

const actionCreators = {
	fetchSearchVideos: searchActions.action_fetchSearchVideos.request,
};

export default connect(
	mapStateToProps,
	actionCreators,
)(Search);
