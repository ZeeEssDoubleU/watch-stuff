import React from "react";
import { connect } from "react-redux";
// import styles
import "./VideoList.scss";
// import components
import VideoPreview from "../../components/VideoPreview/VideoPreview";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";
// import actons / reducers / sagas
import { selector_listLoaded } from "../../store/reducers/session";

const VideoList = props => {
	// checks if search videos exist and makes sure first video contains valid data
	// if not, return empty div
	const videoPreviews = props.videos.map((video, index) =>
		video ? (
			<VideoPreview
				horizontal={true}
				expanded={true}
				video={video}
				key={index}
			/>
		) : null,
	);

	if (props.videos.length === 0) {
		if (!props.listLoaded) {
			return <div />;
		}
		if (props.listLoaded) {
			return (
				<div className="video-list">
					<h3>There are no associated videos. Abort. Abort!</h3>
				</div>
			);
		}
	}

	return (
		<div className="video-list">
			<div className="responsive-content">
				<InfiniteScroll
					bottomReachedCallback={props.bottomReachedCallback}
					showLoader={props.showLoader}>
					{videoPreviews}
				</InfiniteScroll>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	listLoaded: selector_listLoaded(state),
});

export default connect(
	mapStateToProps,
	null,
)(VideoList);
