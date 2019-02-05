import React from "react";
import PropTypes from "prop-types";
import { Button, Divider, Icon } from "semantic-ui-react";

import "./VideoMetadata.scss";
import Ratings from "../../Ratings/Ratings";

const VideoMetadata = props => {
	const viewCount = Number(props.viewCount).toLocaleString() || "";

	return (
		<div className="video-metadata">
			<h3>Video Title</h3>
			<div className="video-stats">
				<span>{viewCount} views</span>
				<div className="video-actions">
					<Ratings likes={75} dislikes={25} />
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
