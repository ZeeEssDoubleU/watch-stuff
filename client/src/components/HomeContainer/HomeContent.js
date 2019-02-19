import React, { Component } from "react";
import { connect } from "react-redux";

import "./HomeContent.scss";
import VideoGrid from "../VideoGrid/VideoGrid";

import { getMostPopularVideos } from "../../store/reducers/videos";

const AMOUNT_TRENDING_VIDEOS = 12;

class HomeContent extends Component {
	render() {
		return (
			<div className="home-content">
				<div className="responsive-video-grid-container">
					<VideoGrid
						title="Trending"
						videos={this.props.mostPopularVideosState}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	mostPopularVideosState: getMostPopularVideos(state),
});

HomeContent = connect(
	mapStateToProps,
	null,
)(HomeContent);

export default HomeContent;
