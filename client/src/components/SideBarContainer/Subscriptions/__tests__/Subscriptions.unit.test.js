import React from "react";
import { shallow } from "enzyme";

import Subscriptions from "../Subscriptions";

test("renders Subscriptions", () => {
	const wrapper = shallow(<Subscriptions />);
	expect(wrapper).toMatchSnapshot();
});
