import React from "react";
import { shallow } from "enzyme";

import HeaderNavContainer from "../HeaderNavContainer";

test("renders HeaderNavContainer", () => {
	const wrapper = shallow(<HeaderNavContainer />);
	expect(wrapper).toMatchSnapshot();
});
