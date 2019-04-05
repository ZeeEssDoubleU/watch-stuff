import React from "react";
import { shallow } from "enzyme";

import Ratings from "../Ratings";

test("renders", () => {
	const wrapper = shallow(<Ratings />);
	expect(wrapper).toMatchSnapshot();
});
