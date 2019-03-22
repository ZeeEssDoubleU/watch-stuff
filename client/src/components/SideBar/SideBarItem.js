import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

import "./SideBarItem.scss";

const SideBarItem = props => {
	return (
		<NavLink
			exact
			to={`${props.path}`}
			className="sidebar-item"
			activeClassName="sidebar-item selected">
			<Menu.Item>
				<div className="sidebar-item-alignment-container">
					<span>
						<Icon size="large" name={props.icon} />
					</span>
					<span>{props.label}</span>
				</div>
			</Menu.Item>
		</NavLink>
	);
};

export default withRouter(SideBarItem);
