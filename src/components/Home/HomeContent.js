import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import styles
import "./HomeContent.scss";
// import components
import VideoGrid from "../VideoGrid/VideoGrid";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";
// import reducers, selectors, sagas
import {
	selector_mostPopularVideos,
	selector_videosByCategory,
	selector_videosByCategoryLoaded,
	selector_validCategoriesLength,
} from "../../store/reducers/videos";

const HomeContent = props => {
	const [lazyLoadIndex, setLazyLoadIndex] = useState(0);

	useEffect(() => {
		const responsiveHeight =
			document.querySelector(".responsive-content").offsetHeight -
			document.querySelector(".loader-container").offsetHeight;
		if (
			// if height of loaded content is less than window height, load more content
			props.videosByCategoryLoaded &&
			responsiveHeight < window.innerHeight
		) {
			lazyLoadVideoCategories();
		}
	});

	// function that loads data to page.  Data already fetched from server
	const lazyLoadVideoCategories = () => {
		if (
			props.videosByCategoryLoaded &&
			lazyLoadIndex < props.validCategoriesLength
		) {
			setLazyLoadIndex(lazyLoadIndex + 1);
		}
	};

	const shouldShowLoader = () => {
		// if videooesByCategory loaded, return true if lazyLoadIndex < total categories
		return props.videosByCategoryLoaded &&
			lazyLoadIndex < props.validCategoriesLength
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
			<div className="responsive-content">
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
	videosByCategory: selector_videosByCategory(state),
	videosByCategoryLoaded: selector_videosByCategoryLoaded(state),
	validCategoriesLength: selector_validCategoriesLength(state),
});

export default connect(
	mapStateToProps,
	null,
)(HomeContent);
