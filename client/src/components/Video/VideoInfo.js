import React, { useState } from "react";
import { Button, Image } from "semantic-ui-react";
import Linkify from "react-linkify";

import "./VideoInfo.scss";

import { getFormattedDate } from "../../utils/format-time";
import { getAbbrevNumber } from "../../utils/format-number";

const VideoInfo = props => {
	const [collapsed, toggleCollapse] = useState(true);
	const channel = props.channel;
	const video = props.video;

	if (!video) return <div />;

	const { channelId, channelTitle, publishedAt, description } = video.snippet;

	const publishDate = getFormattedDate(publishedAt);
	const channelUrl = channel
		? `https://www.youtube.com/channel/${channelId}`
		: null;
	const channelIcon = channel ? channel.snippet.thumbnails.medium.url : null;
	const subCount = channel
		? getAbbrevNumber(channel.statistics.subscriberCount)
		: null;

	return (
		<div className="video-info-container">
			<a href={channelUrl} target="_blank">
				<Image className="channel-image" src={channelIcon} circular />
			</a>
			<div className="video-info">
				<a className="channel-name" href={channelUrl} target="_blank">
					{channelTitle}
				</a>
				<div className="videopublication-date">
					Published on {publishDate}
				</div>
			</div>
			<Button className="subscribe-button" color="youtube">
				SUBSCRIBE {subCount}
			</Button>
			<div className="video-description">
				<div className={collapsed ? "collapsed" : "expanded"}>
					<Linkify>{description}</Linkify>
				</div>
				<Button
					className="show-more-button"
					compact
					onClick={() => toggleCollapse(!collapsed)}>
					{collapsed ? "SHOW MORE" : "SHOW LESS"}
				</Button>
			</div>
		</div>
	);
};

export default VideoInfo;
