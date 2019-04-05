import React from "react";
import { Menu, Image } from "semantic-ui-react";
// import styles
import "./Subscription.scss";

// TODO - Fix styling
const Subscription = props => {
	const channelUrl = `https://www.youtube.com/channel/${props.id}`;
	return (
		<a className="sidebar-item" href={channelUrl} target="_blank" rel="noopener noreferrer">
			<Menu.Item>
				<div className="sidebar-item-alignment-container">
					<Image src={props.icon} avatar />
					<span>{props.label}</span>
				</div>
			</Menu.Item>
		</a>
	);
};

export default Subscription;
