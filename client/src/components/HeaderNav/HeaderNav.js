import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Image, Menu, Form, Input, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import styles
import "./HeaderNav.scss";
// import assets
import logo from "../../assets/images/WatchStuff.svg";
// import actions / reducers / sagas
import { action_toggleSidebar } from "../../store/actions/layout";

const HeaderNav = props => {
	const [searchQuery, setSearchQuery] = useState("");
	const [sideBarVis, toggleSideBarVis] = useState(true);
	const [windowSmall, setWindowSmall] = useState(window.innerWidth < 918);
	const { pathname } = props.location;
	const includesWatch = pathname.includes("watch");
	const appLayout = document.querySelector(".app-layout");
	const sideBar = document.querySelector(".side-nav");

	// event listener that logs window width to state
	window.addEventListener("resize", () => {
		setWindowSmall(window.innerWidth < 918);
	});

	// toggles sidebar visibility when navigating to components
	useEffect(() => {
		// small window or watch component
		if (includesWatch) {
			toggleSideBarVis(false);
		}
	}, [includesWatch]);

	// toggles sidebar visibility based on window resize
	useEffect(() => {
		// small window
		// appLayout and sideBar are NOT affected by sideBarVis
		if (windowSmall && appLayout && sideBar) {
			appLayout.style.marginLeft = "0px";
			sideBar.style.transform = "translateX(-240px)";
		}
		// large window
		if (!windowSmall && !includesWatch && appLayout && sideBar) {
			appLayout.style.marginLeft = sideBarVis ? "240px" : "0px";
			sideBar.style.transform = sideBarVis
				? "translateX(0px)"
				: "translateX(-240px)";
		}
	}, [windowSmall]);

	// toggles sidebar visibility based on clicking sidebar icon
	useEffect(() => {
		// small window or watch component
		// appLayout does NOT move
		if ((windowSmall || includesWatch) && appLayout && sideBar) {
			appLayout.style.marginLeft = "0px";
			sideBar.style.transform = sideBarVis
				? "translateX(0px)"
				: "translateX(-240px)";
		}
		// large window
		if (!windowSmall && !includesWatch && appLayout && sideBar) {
			appLayout.style.marginLeft = sideBarVis ? "240px" : "0px";
			sideBar.style.transform = sideBarVis
				? "translateX(0px)"
				: "translateX(-240px)";
		}
	}, [sideBarVis]);

	// navigates to search URL when search is submitted in HeaderNav
	const onSubmit = () => {
		const queryParsed = encodeURI(searchQuery);
		props.history.push(`/search/${queryParsed}`);
	};

	return (
		<Menu borderless className="top-menu" fixed="top">
			<Menu.Menu className="nav-container">
				<Menu.Item className="header-left">
					<span>
						<Icon
							size="large"
							name="sidebar"
							onClick={() => {
								// TODO
								toggleSideBarVis(!sideBarVis);
								props.action_toggleSidebar();
							}}
						/>
					</span>
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
				<Menu.Item className="header-right">
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
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};

export default withRouter(
	connect(
		null,
		{ action_toggleSidebar },
	)(HeaderNav),
);
