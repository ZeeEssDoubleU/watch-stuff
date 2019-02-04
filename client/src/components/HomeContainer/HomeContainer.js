import React, { Component } from "react";

import VideoGrid from "../VideoGrid/VideoGrid";
import SideBarContainer from '../SideBarContainer/SideBarContainer';
import './HomeContainer.scss';

class HomeContainer extends Component {
	render() {
		return (
			<>
				<SideBarContainer />
				<div className="HomeContainer">
					<div className="responsive-video-grid-container">
						<VideoGrid title="Trending" />
						<VideoGrid title="Autos & Vehicles" hideDivider={true} />
					</div>
				</div>
			</>
		);
	}
}

export default HomeContainer;
