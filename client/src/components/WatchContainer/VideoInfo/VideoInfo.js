import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Divider, Image } from "semantic-ui-react";

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
		let visibility = "collapsed";
		let buttonText = "SHOW MORE";
		if (!this.state.collapsed) {
			visibility = "expanded";
			buttonText = "SHOW LESS";
		}

		let description = (
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem quos, magnam impedit
				vero hic inventore, numquam perspiciatis veritatis obcaecati aut assumenda rerum. Atque
				ratione similique numquam excepturi provident, commodi fugiat dolores accusamus quas
				cupiditate dolorum facilis iure aliquam nesciunt exercitationem totam pariatur deserunt
				nemo cum in. Eum voluptates mollitia quisquam eos repellendus sapiente ratione
				accusantium tempore sit dolorum dolorem est aut dolores nesciunt, ipsum voluptas tempora
				sequi praesentium obcaecati amet! Nam nostrum deleniti a eius, recusandae dolorum? Eius
				tenetur repudiandae debitis incidunt aliquid harum, deserunt, illum tempore,
				voluptatibus fuga aspernatur eaque consequuntur magnam perferendis consectetur earum
				veritatis nisi ut?
			</p>
		);

		return (
			<div className="video-info-container">
				<Image className="channel-image" src="http://via.placeholder.com/48x48" circular />
				<div className="video-info">
					<div className="channel-name">Channel Name</div>
					<div className="videopublication-date">Published on Jun 25, 2019</div>
				</div>
				<Button className="subscribe-button" color="youtube">
					SUBSCRIBE 523K
				</Button>
				<div className="video-description">
					<div className={visibility}>{description}</div>
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
