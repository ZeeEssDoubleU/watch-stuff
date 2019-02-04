import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import HeaderNavContainer from "./components/HeaderNavContainer/HeaderNavContainer";
import HomeContainer from "./components/HomeContainer/HomeContainer";
import WatchContainer from "./components/WatchContainer/WatchContainer";

import "./App.scss";

const API_KEY = "AIzaSyCY1Z702IHnKeFqnF0G6xRxoLnosXwXF2Y";

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
}

export default App;
