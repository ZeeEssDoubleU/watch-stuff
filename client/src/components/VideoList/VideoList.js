import React from "react";

import "./VideoList.scss";
import VideoPreview from "../../components/VideoPreview/VideoPreview";
import SideBar from "../SideBar/SideBar";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

const VideoList = props => {
	// checks if search videos exist and makes sure first video contains valid data
	// if not, return empty div
	const videoPreviews =
		!props.videos || !props.videos[0] ? (
			<div>There are no videos.</div>
		) : (
			props.videos.map((video, index) => {
				if (video) {
					return (
						<VideoPreview
							horizontal={true}
							expanded={true}
							video={video}
							key={index}
						/>
					);
				} else {
					return null;
				}
			})
		);

	return (
		<>
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
