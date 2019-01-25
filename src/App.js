import React, { Component } from "react";

import HeaderNav from "./components/HeaderNav/HeaderNav.js";
import SideBar from "./components/SideBar/SideBar.js";
import Home from "./components/Home/Home.js";

const API_KEY = "AIzaSyCY1Z702IHnKeFqnF0G6xRxoLnosXwXF2Y";

class App extends Component {
	render() {
		return (
			<>
				<HeaderNav />
				<SideBar />
				<Home />
			</>
		);
	}
}

export default App;
