import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

import "./SideBarItem.scss";

const SideBarItem = props => {
	const highlight = props.location.pathname === props.path 
		? " highlight-item" 
		: "";

	return (
		<Link to={`${props.path}`}>
			<Menu.Item className={"sidebar-item" + highlight}>
				<div className="sidebar-item-alignment-container">
					<span>
						<Icon size="large" name={props.icon} />
					</span>
					<span>{props.label}</span>
				</div>
			</Menu.Item>
		</Link>
	);
};

export default withRouter(SideBarItem);
