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
	const { video } = props;
	const { description, title, channelId, channelTitle } = video.snippet;
	const channelUrl = `https://www.youtube.com/channel/${channelId}`;
	const thumbnail = video.snippet.thumbnails.medium.url;
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
	const previewDesc = props.expanded ? description : null;

	return (
		<div className={"video-preview" + horizontal + expanded}>
			<Link to={`/watch/${video.id}`}>
				<div className="image-container">
					<Image src={thumbnail} alt='video preview thumbnail'/>
					<div className="time-label">
						<span>{formattedDuration(video)}</span>
					</div>
				</div>
			</Link>
			<div className="preview-info">
				<Link to={`/watch/${video.id}`}>
					<div
						className={
							"video-title semi-bold show-max-two-lines" + expanded
						}>
						{title}
					</div>
				</Link>
				<div className="preview-metadata-container">
					<a
						className="channel-title semi-bold show-max-two-lines"
						href={channelUrl}
						target="_blank" rel="noopener noreferrer">
						{channelTitle}
					</a>
					<div className="view-and-time">
						<span>{formattedViewAndTime(video)}</span>
					</div>
					<div className="show-max-two-lines preview-description">
						{previewDesc}
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoPreview;
