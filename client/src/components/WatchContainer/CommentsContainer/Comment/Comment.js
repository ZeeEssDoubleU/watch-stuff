import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Image } from "semantic-ui-react";

import "./Comment.scss";
import Ratings from "../../../Ratings/Ratings";

class Comment extends Component {
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
		let buttonText = "Read more";
		if (!this.state.collapsed) {
			visibility = "expanded";
			buttonText = "Read less";
		}

		let commentText = (
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, consequuntur! Nam
				eligendi pariatur a, dolores adipisci consequatur nostrum! Natus harum molestiae
				dignissimos, id voluptatibus ad veniam eum atque quis repudiandae quos sit, quisquam
				tempora error adipisci a ipsum rem excepturi voluptatem delectus dolorum dolor
				reiciendis fugiat? Dolorum error dignissimos explicabo neque corrupti, nisi soluta
				laudantium non inventore officiis nobis earum!
			</p>
		);

		return (
			<div className="comment">
				<Image className="user-image" src="http://via.placeholder.com/48x48" circular />
				<div className="comment-items">
					<div className="user-name">User name</div>
					<div className="comment-date">Comment date</div>
					<div className="comment-body">
						<div className={visibility}>{commentText}</div>
						<Button
							className="show-more-button"
							compact
							onClick={this.onToggleCollapseButtonClick}>
							{buttonText}
						</Button>
					</div>
					<div className="comment-actions">
						<Ratings likes={34} />{" "}
						<Button size="mini" compact>
							REPLY
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

Comment.propTypes = {};

export default Comment;
