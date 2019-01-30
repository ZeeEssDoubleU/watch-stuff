import React from "react";
import { shallow } from "enzyme";

import Watch from "../Watch.js";

test("renders Watch", () => {
	const wrapper = shallow(<Watch />);
	expect(wrapper).toMatchSnapshot();
});
