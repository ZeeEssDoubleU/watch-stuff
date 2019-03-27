import React, { useState, useEffect, useRef } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import styles
import "./App.scss";
// import components
import HeaderNav from "./components/HeaderNav/HeaderNav";
import Home from "./components/Home/Home";
import Watch from "./components/Watch/Watch";
import Trending from "./components/Feed/Trending";
import History from "./components/Feed/History";
import WatchLater from "./components/Feed/WatchLater";
import Liked from "./components/Feed/Liked";
import Search from "./components/Search/Search";
import SideBar from "./components/SideBar/SideBar";
// import actions / reducers / sagas
import { action_youtubeLibraryLoaded } from "./store/actions/user";
// import api key
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

// TODO - Refactor SideBar to that ref can be assigned to it (like .app-layout)
const App = props => {
	const [sideBarVisible, toggleSideBar] = useState(true);
	const [windowSmall, setWindowSmall] = useState(window.innerWidth < 918);
	const { pathname } = props.location;
	const includesWatch = pathname.includes("watch");
	const appLayout = useRef(null);
	const sideBar = document.querySelector(".side-nav");

	// event listener that logs window width to state
	window.addEventListener("resize", () => {
		setWindowSmall(window.innerWidth < 918);
	});

	// toggle sidebar visibility on page load/navigation
	useEffect(() => {
		// small window or watch component
		if (includesWatch || windowSmall) {
			toggleSideBar(false);
		}
		// large window
		// shift appLayout right with sideBar
		if (!includesWatch && !windowSmall) {
			appLayout.current.style.marginLeft = "240px";
			toggleSideBar(true);
		}
	}, [includesWatch, pathname]);

	// toggle sidebar visibility on window resize
	useEffect(() => {
		// small window
		// appLayout and sideBar are NOT affected by sideBarVisible
		if (windowSmall && appLayout.current && sideBar) {
			appLayout.current.style.marginLeft = "0px";
			sideBar.style.transform = "translateX(-240px)";
		}
		// large window
		if (!windowSmall && !includesWatch && appLayout.current && sideBar) {
			appLayout.current.style.marginLeft = sideBarVisible ? "240px" : "0px";
			sideBar.style.transform = sideBarVisible
				? "translateX(0px)"
				: "translateX(-240px)";
		}
	}, [windowSmall]);

	// toggle sidebar visibility on click sidebar icon
	useEffect(() => {
		// small window or watch component
		// appLayout does NOT move
		if ((windowSmall || includesWatch) && appLayout.current && sideBar) {
			appLayout.current.style.marginLeft = "0px";
			sideBar.style.transform = sideBarVisible
				? "translateX(0px)"
				: "translateX(-240px)";
		}
		// large window
		if (!windowSmall && !includesWatch && appLayout.current && sideBar) {
			appLayout.current.style.marginLeft = sideBarVisible ? "240px" : "0px";
			sideBar.style.transform = sideBarVisible
				? "translateX(0px)"
				: "translateX(-240px)";
		}
	}, [sideBarVisible]);

	// load youtube api library
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://apis.google.com/js/api.js";

		script.onload = () => {
			window.gapi.load("client", () => {
				window.gapi.client.setApiKey(API_KEY);
				window.gapi.client
					.request(
						"https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
					)
					.then(
						response => {
							console.log(
								"RESPONSE - YOUTUBE CLIENT LIBRARY",
								response.result,
							);
							props.action_youtubeLibraryLoaded();
						},
						reason => {
							console.log("Error: " + reason.result.error.message);
						},
					);
			});
		};
		document.body.appendChild(script);
	}, []);

	return (
		<>
			<HeaderNav toggleSideBar={() => toggleSideBar(!sideBarVisible)} />
			<SideBar />
			<div className="app-layout" ref={appLayout}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/feed/trending" component={Trending} />
					<Route path="/feed/history" component={History} />
					<Route path="/feed/saved" component={WatchLater} />
					<Route path="/feed/liked" component={Liked} />
					<Route path="/search/:query" component={Search} />
					<Route path="/watch/:videoId" component={Watch} />
				</Switch>
			</div>
		</>
	);
};

export default withRouter(
	connect(
		null,
		{ action_youtubeLibraryLoaded },
	)(App),
);
