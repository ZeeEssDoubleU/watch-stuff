import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

import "./SideBarItem.scss";

const SideBarItem = props => {
	const { path, icon, label } = props;

	const content = (
		<Menu.Item>
			<div className="sidebar-item-alignment-container">
				<span>
					<Icon size="large" name={icon} />
				</span>
				<span>{label}</span>
			</div>
		</Menu.Item>
	);

	// check if path exists
	const contentWithLinks = path ? (
		// if path exists, check if path includes 'https://'
		path.includes("https://") ? (
			// if includes, assign a tag
			<a href={`${path}`} className="sidebar-item" target="_blank" rel="noopener noreferrer">
				{content}
			</a>
		) : (
			// if does NOT include, assign NavLink
			<NavLink
				exact
				to={`${path}`}
				className="sidebar-item"
				activeClassName="sidebar-item selected">
				{content}
			</NavLink>
		)
	) : (
		// if path does NOT exist, assign NavLink
		<NavLink
			exact
			to={`${path}`}
			className="sidebar-item"
			activeClassName="sidebar-item selected">
			{content}
		</NavLink>
	);

	return <>{contentWithLinks}</>;
};

export default withRouter(SideBarItem);
