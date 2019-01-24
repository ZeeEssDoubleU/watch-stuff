import React, { Component } from "react";

import HeaderNav from "./containers/HeaderNav/HeaderNav.js";
import SideBar from "./containers/SideBar/SideBar.js";

const API_KEY = "AIzaSyCY1Z702IHnKeFqnF0G6xRxoLnosXwXF2Y";

class App extends Component {
	render() {
		return (
         <div>
            <HeaderNav />
            <SideBar />
         </div>
		);
	}
}

export default App;
