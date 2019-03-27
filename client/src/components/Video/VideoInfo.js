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

	const channelIcon =
		"https://yt3.ggpht.com/a-/AAuE7mAWpJP0ftMStYJD1f_tGS-RlvHU2rk7zcxRbg=s240-mo-c-c0xffffffff-rj-k-no";
	const channelName = channel
		? channel.snippet.title
		: video.snippet.channelTitle;
	const publishDate = getFormattedDate(video.snippet.publishedAt);
	const description = video.snippet.description;
	const subCount = channel
		? getAbbrevNumber(channel.statistics.subscriberCount)
		: null;

	return (
		<div className="video-info-container">
			<Image
				className="channel-image"
				src={channelIcon}
				circular
			/>
			<div className="video-info">
				<div className="channel-name">{channelName}</div>
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
