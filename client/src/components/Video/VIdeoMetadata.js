import React from "react";
import PropTypes from "prop-types";
import { Button, Divider, Icon } from "semantic-ui-react";

import "./VideoMetadata.scss";
import Ratings from "../Ratings/Ratings";

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
					<Button basic icon labelPosition="left">
						<Icon name="share" />
						SHARE
					</Button>
					<Button basic icon labelPosition="left">
						<Icon name="add circle" />
						SAVE
					</Button>
					<Button basic icon>
						<Icon name="ellipsis horizontal" />
					</Button>
				</div>
			</div>
			<Divider />
		</div>
	);
};

VideoMetadata.propTypes = {};

export default VideoMetadata;
