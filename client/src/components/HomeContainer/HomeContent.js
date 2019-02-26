import React, { Component } from "react";
import { connect } from "react-redux";

import "./HomeContent.scss";
import VideoGrid from "../VideoGrid/VideoGrid";

import {
	selector_mostPopularVideos,
	selector_mostPopularVideosByCategory,
} from "../../store/reducers/videos";

class HomeContent extends Component {
	componentDidUpdate(prevProps) {
		if (
			this.props.mostPopularVideosByCategory &&
			this.props.mostPopularVideosByCategory !==
			prevProps.mostPopularVideosByCategory
		) {
			console.log("WHAT WHAT", this.props.mostPopularVideosByCategory);
		}
	}
	render() {
		return (
			<div className="home-content">
				<div className="responsive-video-grid-container">
					<VideoGrid
						title="Trending"
						videos={this.props.mostPopularVideos}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	mostPopularVideos: selector_mostPopularVideos(state),
	mostPopularVideosByCategory: selector_mostPopularVideosByCategory(state),
});

HomeContent = connect(
	mapStateToProps,
	null,
)(HomeContent);

export default HomeContent;
