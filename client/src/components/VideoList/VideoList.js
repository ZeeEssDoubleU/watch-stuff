import React from "react";

import "./VideoList.scss";
import VideoPreview from "../../components/VideoPreview/VideoPreview";
import SideBar from "../SideBar/SideBar";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

const VideoList = props => {
	if (!props.videos || !props.videos.every(video => video)) return <div />;

	const videoPreviews = props.videos.map(video => (
		<VideoPreview
			horizontal={true}
			expanded={true}
			video={video}
			key={video.id}
		/>
   ));
   
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
