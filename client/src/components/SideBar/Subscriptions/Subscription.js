import React from "react";
import { Menu, Image } from "semantic-ui-react";

import "./Subscription.scss";

// TODO - Update Subscription code to actually pull activity (broadcasting, new vids, etc) and update SideBar with data
// TODO - Fix styling
const Subscription = props => {
	const channelUrl = `https://www.youtube.com/user/${props.id}`;
	return (
		<Menu.Item>
			<a className="subscription" href={channelUrl} target="_blank">
				<div>
					<Image src={props.icon} avatar />
					<span>{props.label}</span>
				</div>
			</a>
		</Menu.Item>
	);
};

export default Subscription;
