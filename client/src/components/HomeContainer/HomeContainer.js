import React, { Component } from "react";

import './HomeContainer.scss';
import HomeContent from "./HomeContent";
import SideBarContainer from '../SideBarContainer/SideBarContainer';

class HomeContainer extends Component {
	render() {
		return (
			<>
				<SideBarContainer />
				<HomeContent />
			</>
		);
	}
}

export default HomeContainer;
