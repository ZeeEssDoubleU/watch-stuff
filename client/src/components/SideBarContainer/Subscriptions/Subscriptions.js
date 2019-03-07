import React from "react";
import { Divider } from "semantic-ui-react";

import Subscription from "./Subscription";
import SideBarHeader from "../SideBarHeader";

const Subscriptions = props => (
	<>
		<SideBarHeader title="Subscriptions" />
		<Subscription label="Music Channel" broadcasting />
		<Subscription label="Coursea" amountNewVideos={10} />
		<Subscription label="TEDx Talks" amountNewVideos={23} />
		<Subscription label="Standford iOs" amountNewVideos={4} />
		<Subscription label="Udacity" amountNewVideos={114} />
		<Divider />
	</>
);

export default Subscriptions;
