import React, { Component } from "react";
import { Image } from "semantic-ui-react";

import { getAbbrevNumber } from "../../utils/format-number";
import {
	getFormattedDuration,
	getFormattedTimeAgo,
} from "../../utils/format-time";

import "./VideoPreview.scss";

class VideoPreview extends Component {
	render() {
		const horizontal = this.props.horizontal ? " horizontal" : "";
		const { video } = this.props;
		if (!video) {
			return <div />;
		}

		return (
			<div className={"video-preview" + horizontal}>
				<div className="image-container">
					<Image src={video.snippet.thumbnails.medium.url} />
					<div className="time-label">
						<span>{this.getFormattedDuration(video)}</span>
					</div>
				</div>
				<div className="video-info">
					<div className="semi-bold show-max-two-lines">
						{video.snippet.title}
					</div>
					<div className="video-preview-metadata-container">
						<div className="channel-title">
							{video.snippet.channelTitle}
						</div>
						<div>
							<span>{this.getFormattedViewAndTime(video)}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}

	getFormattedDuration = video => {
		if (video.contentDetails && video.contentDetails.duration) {
			// moment imported from above, format allowed from moment-duration-format
			return getFormattedDuration(video.contentDetails.duration);
		}
		return "";
	};
	
	getFormattedViewAndTime = video => {
		if (video.statistics && video.statistics.viewCount) {
			// moment and getAbbrevNumber imported at top
			const formattedViewCount = getAbbrevNumber(video.statistics.viewCount);
			const formattedTimeAgo = getFormattedTimeAgo(
				video.snippet.publishedAt,
			);

			return `${formattedViewCount} views • ${formattedTimeAgo}`;
		}
		return "";
	};
}

export default VideoPreview;
