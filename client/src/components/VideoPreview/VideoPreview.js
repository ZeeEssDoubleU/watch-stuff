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

	const horizontal = props.horizontal ? " horizontal" : "";
	const expanded = props.expanded ? " expanded" : "";
	const description = props.expanded ? video.snippet.description : null;

	return (
		<Link to={`/watch/${video.id}`}>
			<div className={"video-preview" + horizontal + expanded}>
				<div className="image-container">
					<Image src={video.snippet.thumbnails.medium.url} />
					<div className="time-label">
						<span>{formattedDuration(video)}</span>
					</div>
				</div>
				<div className="preview-info">
					<div className={"semi-bold show-max-two-lines" + expanded}>
						{video.snippet.title}
					</div>
					<div className="preview-metadata-container">
						<div className="channel-title semi-bold show-max-two-lines">
							{video.snippet.channelTitle}
						</div>
						<div className="view-and-time">
							<span>{formattedViewAndTime(video)}</span>
						</div>
						<div className="show-max-two-lines preview-description">{description}</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default VideoPreview;
