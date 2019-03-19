import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Image, Menu, Form, Input, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./HeaderNav.scss";
import logo from "../../assets/images/WatchStuff.svg";

const HeaderNav = props => {
	const [searchQuery, setSearchQuery] = useState("");
	const onSubmit = () => {
		const queryParsed = encodeURI(searchQuery);
		props.history.push(`/search/${queryParsed}`);
	};

	return (
		<Menu borderless className="top-menu" fixed="top">
			<Menu.Menu className="nav-container">
				<Menu.Item header className="logo">
					<Link to="/">
						<img src={logo} alt="logo" />
					</Link>
				</Menu.Item>
				<Menu.Item className="search-input">
					<Form onSubmit={() => onSubmit()}>
						<Form.Field>
							<Input
								placeholder="Search"
								size="small"
								action="Go"
								value={searchQuery}
								onChange={event => setSearchQuery(event.target.value)}
								onSubmit={event => (event.target.value = "")}
							/>
						</Form.Field>
					</Form>
				</Menu.Item>
				<Menu.Menu>
					<Menu.Item>
						<Icon
							className="header-icon"
							name="video camera"
							size="large"
						/>
					</Menu.Item>
					<Menu.Item>
						<Icon
							className="header-icon"
							name="grid layout"
							size="large"
						/>
					</Menu.Item>
					<Menu.Item>
						<Icon className="header-icon" name="chat" size="large" />
					</Menu.Item>
					<Menu.Item>
						<Icon className="header-icon" name="alarm" size="large" />
					</Menu.Item>
					<Menu.Item name="avatar">
						<Image src="http://via.placeholder.com/80x80" avatar />
					</Menu.Item>
				</Menu.Menu>
			</Menu.Menu>
		</Menu>
	);
};

export default withRouter(HeaderNav);
