import React from "react";
import { shallow } from "enzyme";

import Subscriptions from "../Subscriptions.js";

test("renders Subscriptions", () => {
	const wrapper = shallow(<Subscriptions />);
	expect(wrapper).toMatchSnapshot();
});
