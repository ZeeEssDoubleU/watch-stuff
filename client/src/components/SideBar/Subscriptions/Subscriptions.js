import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Divider } from "semantic-ui-react";
// import components
import Subscription from "./Subscription";
import SideBarHeader from "../SideBarHeader";
// import actions / reducers / sagas
import { selector_subscriptions } from "../../../store/reducers/user";

// TODO - Update Subscriptions code to actually pull activity (broadcasting, new vids, etc) and update SideBar with data
const Subscriptions = props => {
	const { subscriptions } = props;

	if (Object.keys(subscriptions).length === 0) return <div />;

	const displaySubs = Object.keys(subscriptions).map(channelId => {
		const { channelTitle, channelIcon } = subscriptions[channelId];
		return (
			<Subscription
				id={channelId}
				label={channelTitle}
				icon={channelIcon}
				key={channelId}
			/>
		);
	});

	return (
		<>
			<SideBarHeader title="Subscriptions" />
			{displaySubs}
			<Divider />
		</>
	);
};

const mapStateToProps = state => ({
	subscriptions: selector_subscriptions(state),
});

export default connect(
	mapStateToProps,
	null,
)(Subscriptions);
