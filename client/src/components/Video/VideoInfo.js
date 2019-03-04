import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Image } from "semantic-ui-react";
import { getFormattedDate } from "../../utils/format-time";
import Linkify from "react-linkify";

import "./VideoInfo.scss";

class VideoInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: true,
		};
	}

	onToggleCollapseButtonClick = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		if (!this.props.video) return <div />;

		let visibility = "collapsed";
		let buttonText = "SHOW MORE";
		if (!this.state.collapsed) {
			visibility = "expanded";
			buttonText = "SHOW LESS";
		}

		const channelName = this.props.video.snippet.channelTitle;
		const publishDate = getFormattedDate(
			this.props.video.snippet.publishedAt,
		);
		const description = this.props.video.snippet.description;

		return (
			<div className="video-info-container">
				<Image
					className="channel-image"
					src="http://via.placeholder.com/48x48"
					circular
				/>
				<div className="video-info">
					<div className="channel-name">{channelName}</div>
					<div className="videopublication-date">
						Published on {publishDate}
					</div>
				</div>
				<Button className="subscribe-button" color="youtube">
					SUBSCRIBE 523K
				</Button>
				<div className="video-description">
					<div className={visibility}>
						<Linkify>{description}</Linkify>
					</div>
					<Button
						className="show-more-button"
						compact
						onClick={this.onToggleCollapseButtonClick}>
						{buttonText}
					</Button>
				</div>
			</div>
		);
	}
}

VideoInfo.propTypes = {};

export default VideoInfo;
