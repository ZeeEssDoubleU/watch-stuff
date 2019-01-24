import React from "react";
import { shallow } from "enzyme";

import SideBar from "../SideBar.js";

test("renders SideBar", () => {
	const wrapper = shallow(<SideBar />);
	expect(wrapper).toMatchSnapshot();
});
