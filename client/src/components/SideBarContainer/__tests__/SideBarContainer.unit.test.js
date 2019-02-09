import React from "react";
import { shallow } from "enzyme";

import SideBarContainer from "../SideBarContainer";

test("renders SideBarContainer", () => {
	const wrapper = shallow(<SideBarContainer />);
	expect(wrapper).toMatchSnapshot();
});
