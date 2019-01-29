import React from "react";
import { shallow } from "enzyme";

import SideBarFooter from "../SideBarFooter.js";

test("renders SideBarFooter", () => {
	const wrapper = shallow(<SideBarFooter />);
	expect(wrapper).toMatchSnapshot();
});
