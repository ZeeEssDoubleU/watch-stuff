import React from "react";
import { Menu } from "semantic-ui-react";

import "./SideBarHeader.scss";

const SideBarHeader = props => {
	const heading = props.title ? props.title.toUpperCase() : "";
	return <Menu.Header className="side-bar-header">{heading}</Menu.Header>;
};

export default SideBarHeader;
