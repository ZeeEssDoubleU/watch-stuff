import React, { Component } from "react";
import { Image } from "semantic-ui-react";

import "./VideoPreview.scss";

class VideoPreview extends Component {
	render() {
		const horizontal = this.props.horizontal ? " horizontal" : "";

		return (
			<div className={"video-preview" + horizontal}>
				<div className="image-container">
					<Image src="http://via.placeholder.com/210x118" />
					<div className="time-label">
						<span>05:22</span>
					</div>
				</div>
				<div className="video-info">
					<div className="semi-bold show-max-two-lines">Video Title</div>
					<div className="video-preview-metadata-container">
						<div className="channel-title">Channel Title</div>
						<div>
							<span>2.1M views • 2 days ago</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default VideoPreview;
