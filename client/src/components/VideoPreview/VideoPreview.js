import React from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./VideoPreview.scss";

import { getAbbrevNumber } from "../../utils/format-number";
import {
	getFormattedDuration,
	getFormattedTimeAgo,
} from "../../utils/format-time";

const VideoPreview = props => {
	const horizontal = props.horizontal ? " horizontal" : "";
	const video = props.video;

	if (!video) return <div />;

	const formattedDuration = video => {
		if (video.contentDetails && video.contentDetails.duration) {
			// moment imported from above, format allowed from moment-duration-format
			return getFormattedDuration(video.contentDetails.duration);
		}
		return "";
	};

	const formattedViewAndTime = video => {
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

	return (
		<Link to={`/watch/${video.id}`}>
			<div className={"video-preview" + horizontal}>
				<div className="image-container">
					<Image src={video.snippet.thumbnails.medium.url} />
					<div className="time-label">
						<span>{formattedDuration(video)}</span>
					</div>
				</div>
				<div className="video-info">
					<div className="semi-bold show-max-two-lines">
						{video.snippet.title}
					</div>
					<div className="video-preview-metadata-container">
						<div className="channel-title semi-bold">
							{video.snippet.channelTitle}
						</div>
						<div>
							<span>{formattedViewAndTime(video)}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default VideoPreview;
