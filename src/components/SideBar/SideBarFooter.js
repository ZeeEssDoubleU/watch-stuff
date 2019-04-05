import React from "react";

import "./SideBarFooter.scss";

const SideBarFooter = props => {
	return (
		<>
			<div className="footer-block">
				<div>A Youtube clone used as a portfolio piece.</div>
				<br />
				<div>
					Built on <strong>React</strong> with{" "}
					<strong>Semantic UI</strong> by, Me!
				</div>
			</div>
		</>
	);
};

export default SideBarFooter;
