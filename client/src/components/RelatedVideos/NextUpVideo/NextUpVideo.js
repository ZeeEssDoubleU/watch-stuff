import React from "react";
import { Checkbox, Divider } from "semantic-ui-react";

import "./NextUpVideo.scss";
import VideoPreview from "../../VideoPreview/VideoPreview";

const NextUpVideo = props => {
	if (!props.video) return <div />;

	return (
		<div className="next-up-container">
			<div className="next-up-header">
				<h4>Up next</h4>
				<div className="next-up-toggle">
					<span>AUTOPLAY</span>
					<Checkbox toggle defaultChecked />
				</div>
			</div>
			<VideoPreview
				horizontal={true}
				video={props.video}
				key={props.video.id}
			/>
			<Divider />
		</div>
	);
};

export default NextUpVideo;
