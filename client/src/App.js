import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import components
import HeaderNav from "./components/HeaderNav/HeaderNav";
import Home from "./components/Home/Home";
import Watch from "./components/Watch/Watch";

// import actions / reducers / sagas
import { action_youtubeLibraryLoaded } from "./store/actions/api";

// import styles
import "./App.scss";

const API_KEY = "AIzaSyBQ7gbl7hDtzVIQM3xTgjxT6Vcx1dvC0NY";

const App = props => {
	useEffect(() => {
		loadYoutubeApi();
	});

	const loadYoutubeApi = () => {
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
	};

	return (
		<>
			<HeaderNav />
			<div className="app-layout">
				<Switch>
					<Route exact path="/" component={Home} />
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
