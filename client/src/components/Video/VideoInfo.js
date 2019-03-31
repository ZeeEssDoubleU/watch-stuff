import React, { useState } from "react";
import { Button, Image } from "semantic-ui-react";
import Linkify from "react-linkify";

import "./VideoInfo.scss";

import { getFormattedDate } from "../../utils/format-time";
import { getAbbrevNumber } from "../../utils/format-number";

const VideoInfo = props => {
	const [isCollapsed, toggleCollapse] = useState(true);
	const { channel, video, subscribe, subscriptions } = props;

	if (!video) return <div />;

	const { channelId, channelTitle, publishedAt, description } = video.snippet;

	const publishDate = getFormattedDate(publishedAt);
	const channelUrl = channel
		? `https://www.youtube.com/channel/${channelId}`
		: null;
	const channelIcon = channel ? channel.snippet.thumbnails.medium.url : null;
	const isSubbed = subscriptions[channelId] ? true : false;
	const subbedClass = isSubbed ? " subscribed" : "";
	// TODO - Refactor code so that subbing actually updates subCount
	const subCount = channel
		? getAbbrevNumber(
				isSubbed
					? Number(channel.statistics.subscriberCount) + 1
					: Number(channel.statistics.subscriberCount),
		  )
		: null;

	return (
		<div className="video-info-container">
			<a href={channelUrl} target="_blank" rel="noopener noreferrer">
				<Image className="channel-image" src={channelIcon} circular />
			</a>
			<div className="video-info">
				<a
					className="channel-name"
					href={channelUrl}
					target="_blank"
					rel="noopener noreferrer">
					{channelTitle}
				</a>
				<div className="videopublication-date">
					Published on {publishDate}
				</div>
			</div>
			<Button
				className={"subscribe-button" + subbedClass}
				color="youtube"
				onClick={() => subscribe(channelId, channelTitle, channelIcon)}>
				{isSubbed ? "SUBSCRIBED" : "SUBSCRIBE"} {subCount}
			</Button>
			<div className="video-description">
				<div className={isCollapsed ? "collapsed" : "expanded"}>
					<Linkify>{description}</Linkify>
				</div>
				<Button
					className="show-more-button"
					compact
					onClick={() => toggleCollapse(!isCollapsed)}>
					{isCollapsed ? "SHOW MORE" : "SHOW LESS"}
				</Button>
			</div>
		</div>
	);
};

export default VideoInfo;
