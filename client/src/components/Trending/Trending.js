import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./Trending.scss";
import VideoPreview from "../../components/VideoPreview/VideoPreview";
import SideBar from "../SideBar/SideBar";

import * as videoActions from "../../store/actions/videos";
import { selector_youtubeLibraryLoaded } from "../../store/reducers/api";
import {
	selector_mostPopularLoaded,
	selector_mostPopularVideos,
} from "../../store/reducers/videos";

const Trending = props => {
	useEffect(() => {
		if (props.youtubeLibraryLoaded && !props.mostPopularLoaded) {
			props.fetchMostPopular();
		}
	}, [props.youtubeLibraryLoaded]);

	const videoPreviews = props.mostPopular
		? props.mostPopular.map(video => (
				<VideoPreview
					horizontal={true}
					expanded={true}
					video={video}
					key={video.id}
				/>
		  ))
		: null;

	return (
		<>
			<SideBar />
			<div className="trending">{videoPreviews}</div>
		</>
	);
};

const mapStateToProps = state => ({
	youtubeLibraryLoaded: selector_youtubeLibraryLoaded(state),
	mostPopularLoaded: selector_mostPopularLoaded(state),
	mostPopular: selector_mostPopularVideos(state),
});

const actionCreators = {
	fetchMostPopular: videoActions.action_fetchMostPopular.request,
};

export default connect(
	mapStateToProps,
	actionCreators,
)(Trending);
