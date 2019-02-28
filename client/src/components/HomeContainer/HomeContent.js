import React, { Component } from "react";
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

class HomeContent extends Component {
	constructor(props) {
		super(props);
		this.state = { lazyLoadIndex: 0 };
	}

	componentDidUpdate() {
		let homeContentHeight =
			document.querySelector(".home-content").offsetHeight -
			document.querySelector(".loader-container").offsetHeight;
		if (
			this.props.videosByCategoryLoaded &&
			homeContentHeight < window.innerHeight
		) {
			this.lazyLoadVideoCategories();
		}
	}

	lazyLoadVideoCategories = () => {
		if (
			this.props.videosByCategoryLoaded &&
			this.state.lazyLoadIndex < this.props.videosByCategoryLength
		) {
			this.setState({ lazyLoadIndex: this.state.lazyLoadIndex + 1 });
		}
	};

	shouldShowLoader = () => {
		// if vidoesByCategory loaded, return true if lazyLoadIndex < total categories
		return this.props.videosByCategoryLoaded &&
			this.state.lazyLoadIndex < this.props.videosByCategoryLength
			? true
			: false;
	};

	render() {
		const categoryNames = Object.keys(this.props.videosByCategory);
		const categoryGrids = categoryNames
			.slice(0, this.state.lazyLoadIndex)
			.map((categoryName, index) => (
				<VideoGrid
					title={categoryName}
					key={categoryName}
					videos={this.props.videosByCategory[categoryName]}
					hideDivider={index === categoryNames.length - 1}
				/>
			));

		return (
			<div className="home-content">
				<div className="responsive-video-grid-container">
					<InfiniteScroll
						lazyLoadCallback={this.lazyLoadVideoCategories}
						showLoader={this.shouldShowLoader()}>
						<VideoGrid title="Trending" videos={this.props.mostPopular} />
						{categoryGrids}
					</InfiniteScroll>
				</div>
			</div>
		);
	}
}

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
