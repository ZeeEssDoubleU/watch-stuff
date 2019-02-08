import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import components
import HeaderNavContainer from "./components/HeaderNavContainer/HeaderNavContainer";
import HomeContainer from "./components/HomeContainer/HomeContainer";
import WatchContainer from "./components/WatchContainer/WatchContainer";

// import actions / reducers / sagas
import { youtubeLibraryLoaded } from "./store/actions/api";

// import styles
import "./App.scss";

const API_KEY = "AIzaSyCmQiCjbEAyUJcuP8SJtTHV4dqb1QW6Yuk";

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
		script.src = "https://apis.google.com/js/client.js";

		script.onload = () => {
			window.gapi.load("client", () => {
				window.gapi.client.setApiKey(API_KEY);
				window.gapi.client.load("youtube", "v3", () => {
					this.props.youtubeLibraryLoaded();
				});
			});
		};

		document.body.appendChild(script);
	}
}

App = withRouter(
	connect(
		null,
		{ youtubeLibraryLoaded },
	)(App),
);

export default App;
