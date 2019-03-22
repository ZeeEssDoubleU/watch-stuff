import React from "react";
import { Button, Divider, Icon } from "semantic-ui-react";

import "./VideoMetadata.scss";
import Ratings from "../Ratings/Ratings";
import RatingsBar from "../Ratings/RatingsBar";

const VideoMetadata = props => {
	if (!props.video) return <div />;

	const title = props.video.snippet.title;
	const viewCount = Number(props.video.statistics.viewCount).toLocaleString();
	const likeCount = Number(props.video.statistics.likeCount);
	const dislikeCount = Number(props.video.statistics.dislikeCount);

	return (
		<div className="video-metadata">
			<h3>{title}</h3>
			<div className="video-stats">
				<span>{viewCount} views</span>
				<div className="video-actions">
					<Ratings likes={likeCount} dislikes={dislikeCount} />
					<RatingsBar likes={likeCount} dislikes={dislikeCount} />
					<Button basic labelPosition="left">
						<Icon name="share" />
						<span>SHARE</span>
					</Button>
					<Button basic labelPosition="left">
						<Icon name="add circle" />
						<span>SAVE</span>
					</Button>
					<Button basic className="ellipsis">
						<Icon name="ellipsis horizontal" />
					</Button>
				</div>
			</div>
			<Divider />
		</div>
	);
};

export default VideoMetadata;
