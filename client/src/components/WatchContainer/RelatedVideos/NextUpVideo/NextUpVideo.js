import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Divider } from "semantic-ui-react";

import "./NextUpVideo.scss";
import "../../../VideoPreview/VideoPreview";
import VideoPreview from "../../../VideoPreview/VideoPreview";

const NextUpVideo = props => {
	return (
		<>
			<div className="next-up-container">
				<h4>Up Next</h4>
				<div className="next-up-toggle">
					<span>Autoplay</span>
					<Checkbox toggle defaultChecked />
				</div>
			</div>
			<VideoPreview horizontal={true} />
			<Divider />
		</>
	);
};

NextUpVideo.propTypes = {};

export default NextUpVideo;
