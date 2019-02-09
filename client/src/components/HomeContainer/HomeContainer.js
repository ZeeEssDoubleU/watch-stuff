import React, { Component } from "react";

import './HomeContainer.scss';
import VideoGrid from "../VideoGrid/VideoGrid";
import SideBarContainer from '../SideBarContainer/SideBarContainer';

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
