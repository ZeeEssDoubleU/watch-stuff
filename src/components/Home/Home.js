import React, { Component } from "react";

import VideoGrid from "../VideoGrid/VideoGrid.js";
import Sidebar from '../SideBar/SideBar.js';
import './Home.scss';

class Home extends Component {
	render() {
		return (
			<>
				<Sidebar />
				<div className="home">
					<div className="responsive-video-grid-container">
						<VideoGrid title="Trending" />
						<VideoGrid title="Autos & Vehicles" hideDivider={true} />
					</div>
				</div>
			</>
		);
	}
}

export default Home;
