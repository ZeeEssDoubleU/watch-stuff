import React, { useState, useEffect } from "react";
import { Button, Divider, Icon } from "semantic-ui-react";

import "./VideoMetadata.scss";
import Ratings from "../Ratings/Ratings";

const VideoMetadata = props => {
	if (!props.video) return <div />;

	const videoId = props.video.id;
	const { pathname } = props;
	const [saved, setSaved] = useState(props.isSaved[videoId]);
	// effect updates local saved state (style) when url changes
	useEffect(() => {
		setSaved(props.isSaved[videoId]);
	}, [pathname]);

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
					<Ratings
						likes={likeCount}
						dislikes={dislikeCount}
						isVideo={true}
						videoId={videoId}
						ratingsBar={true}
					/>
					<Button className="button-share" basic labelPosition="left">
						<Icon name="share" />
						<span>SHARE</span>
					</Button>
					<Button
						basic
						labelPosition="left"
						onClick={() => {
							props.saveVideo(videoId);
							setSaved(props.isSaved[videoId]);
						}}>
						<Icon name="add circle" className={saved ? "saved" : ""} />
						<span className={saved ? "saved" : ""}>
							{saved ? "SAVED" : "SAVE"}
						</span>
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
