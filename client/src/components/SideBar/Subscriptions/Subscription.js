import React from "react";
import { Menu, Icon, Image } from "semantic-ui-react";

import './Subscription.scss';

const Subscription = props => {
	let rightElement = null;
	if (props.broadcasting) {
		rightElement = <Icon name="signal" />;
	} else if (props.amountNewVideos) {
		rightElement = <span className="new-videos-count">{props.amountNewVideos}</span>;
	}

	return (
		<Menu.Item>
			<div className="subscription">
				<div>
					<Image src="http://via.placeholder.com/28x28" avatar />
					<span>{props.label}</span>
				</div>
				{rightElement}
			</div>
		</Menu.Item>
	);
};

export default Subscription;
