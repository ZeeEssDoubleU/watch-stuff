import React from "react";
import { Menu, Divider } from "semantic-ui-react";

import "./SideBar.scss";
import SideBarHeader from "./SideBarHeader";
import SideBarItem from "./SideBarItem";
import Subscriptions from "./Subscriptions/Subscriptions";
import SideBarFooter from "./SideBarFooter";

const SideBar = props => (
	<Menu borderless vertical stackable fixed="left" className="side-nav">
		<SideBarItem path="/" label="Home" icon="home" />
		<SideBarItem path="/feed/trending" label="Trending" icon="fire" />
		<SideBarItem path="/watch" label="Followers" icon="spy" />
		<Divider />
		<SideBarHeader title="Library" />
		<SideBarItem path="/feed/history" label="History" icon="history" />
		<SideBarItem path="/feed/saved" label="Watch later" icon="clock" />
		<SideBarItem path="/feed/liked" label="Liked videos" icon="thumbs up" />
		<Divider />
		<Subscriptions />
		<SideBarHeader title="More From Youtube" />
		<SideBarItem
			path="https://www.youtube.com/channel/UClgRkhTL3_hImCAmdLfDE4g"
			label="Movies and Shows"
			icon="film"
		/>
		<Divider />
		{/* TODO - None of these bottom SideBarItems go anywhere useful */}
		<SideBarItem path="/account" label="Settings" icon="setting" />
		<SideBarItem path="/report-history" label="Report history" icon="flag" />
		<SideBarItem path="/help" label="Help" icon="help circle" />
		<SideBarItem path="/feedback" label="Send feedback" icon="comment" />
		<Divider />
		<SideBarFooter />
	</Menu>
);

export default SideBar;
