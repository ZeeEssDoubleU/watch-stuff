import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import components
import HeaderNavContainer from "./components/HeaderNavContainer/HeaderNavContainer";
import HomeContainer from "./components/HomeContainer/HomeContainer";
import WatchContainer from "./components/WatchContainer/WatchContainer";

// import actions / reducers / sagas
import { action_youtubeLibraryLoaded } from "./store/actions/api";

// import styles
import "./App.scss";

const API_KEY = "AIzaSyBgXzOUW-c5STY2tGItjriaVK7uah8wxss";

class App extends Component {
	render() {
		return (
			<>
				<HeaderNavContainer />
				<div className="app-layout">
					<Switch>
						<Route exact path="/" component={HomeContainer} />
						<Route path="/watch" component={WatchContainer} />
					</Switch>
				</div>
			</>
		);
	}

	componentDidMount() {
		this.loadYoutubeApi();
	}

	loadYoutubeApi() {
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
							this.props.action_youtubeLibraryLoaded();
						},
						reason => {
							console.log("Error: " + reason.result.error.message);
						},
					);
			});
		};

		// // 1. Load the JavaScript client library.
		// script.onload = () =>
		// 	window.gapi.load("client", () => {
		// 		// 2. Initialize the JavaScript client library.
		// 		window.gapi.client
		// 			.init({
		// 				apiKey: `${API_KEY}`,
		// 			})
		// 			// 3. Initialize and make the API request.
		// 			.then(() =>
		// 				window.gapi.client.request(
		// 					"https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
		// 				),
		// 			)
		// 			.then(
		// 				response => {
		// 					console.log(response.result);
		// 					this.props.action_youtubeLibraryLoaded();
		// 				},
		// 				reason => {
		// 					console.log("Error: " + reason.result.error.message);
		// 				},
		// 			);
		// 	});

		document.body.appendChild(script);
	}
}

App = withRouter(
	connect(
		null,
		{ action_youtubeLibraryLoaded },
	)(App),
);

export default App;
