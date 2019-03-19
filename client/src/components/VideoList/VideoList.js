import React from "react";

import "./VideoList.scss";
import VideoPreview from "../../components/VideoPreview/VideoPreview";
import SideBar from "../SideBar/SideBar";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

const VideoList = props => {
   // checks if search videos exist and makes sure first video contains valid data
   // if not, return empty div
	if (!props.videos || !props.videos[0]) return <div />;

	const videoPreviews = props.videos.map(video =>
		video ? (
			<VideoPreview
				horizontal={true}
				expanded={true}
				video={video}
				key={video.id}
			/>
		) : null,
	);

	return (
		<>
			<SideBar />
			<div className="video-list">
				<div className="responsive-video-grid-container">
					<InfiniteScroll
						bottomReachedCallback={props.bottomReachedCallback}
						showLoader={props.showLoader}>
						{videoPreviews}
					</InfiniteScroll>
				</div>
			</div>
		</>
	);
};

export default VideoList;
