import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./HomeContent.scss";
import VideoGrid from "../VideoGrid/VideoGrid";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

import {
	selector_mostPopularVideos,
	selector_mostPopularVideosByCategory,
	selector_mostPopularVideosByCategoryLoaded,
	selector_mostPopularVideosByCategoryLength,
} from "../../store/reducers/videos";

const HomeContent = props => {
	const [lazyLoadIndex, setLazyLoadIndex] = useState(0);

	useEffect(() => {
		const homeContentHeight =
			document.querySelector(".home-content").offsetHeight -
			document.querySelector(".loader-container").offsetHeight;
		if (
			// if height of loaded content is less than window height, load more content
			props.videosByCategoryLoaded &&
			homeContentHeight < window.innerHeight
		) {
			lazyLoadVideoCategories();
		}
	});

	// function that loads data to page.  Data already fetched from server
	const lazyLoadVideoCategories = () => {
		if (
			props.videosByCategoryLoaded &&
			lazyLoadIndex < props.videosByCategoryLength
		) {
			setLazyLoadIndex(lazyLoadIndex + 1);
		}
	};

	const shouldShowLoader = () => {
		// if vidoesByCategory loaded, return true if lazyLoadIndex < total categories
		return props.videosByCategoryLoaded &&
			lazyLoadIndex < props.videosByCategoryLength
			? true
			: false;
	};

	const categoryNames = Object.keys(props.videosByCategory);
	const categoryGrids = categoryNames
		.slice(0, lazyLoadIndex)
		.map((categoryName, index) => (
			<VideoGrid
				title={categoryName}
				key={categoryName}
				videos={props.videosByCategory[categoryName]}
				hideDivider={index === categoryNames.length - 1}
			/>
		));

	return (
		<div className="home-content">
			<div className="responsive-video-grid-container">
				<InfiniteScroll
					bottomReachedCallback={lazyLoadVideoCategories}
					showLoader={shouldShowLoader()}>
					<VideoGrid title="Trending" videos={props.mostPopular} />
					{categoryGrids}
				</InfiniteScroll>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	mostPopular: selector_mostPopularVideos(state),
	videosByCategory: selector_mostPopularVideosByCategory(state),
	videosByCategoryLoaded: selector_mostPopularVideosByCategoryLoaded(state),
	videosByCategoryLength: selector_mostPopularVideosByCategoryLength(state),
});

export default connect(
	mapStateToProps,
	null,
)(HomeContent);
