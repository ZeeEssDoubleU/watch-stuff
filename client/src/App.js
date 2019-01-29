import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import HeaderNav from "./components/HeaderNav/HeaderNav.js";
import Home from "./components/Home/Home.js";
import Watch from "./components/Watch/Watch.js";

import "./App.scss";

const API_KEY = "AIzaSyCY1Z702IHnKeFqnF0G6xRxoLnosXwXF2Y";

class App extends Component {
	render() {
		return (
			<>
				<HeaderNav />
				<div className="app-layout">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/watch" component={Watch} />
					</Switch>
				</div>
			</>
		);
	}
}

export default App;
