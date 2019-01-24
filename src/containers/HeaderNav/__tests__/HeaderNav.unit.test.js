import React from "react";
import { shallow } from "enzyme";

import HeaderNav from "../HeaderNav.js";

test("renders HeaderNav", () => {
	const wrapper = shallow(<HeaderNav />);
	expect(wrapper).toMatchSnapshot();
});
